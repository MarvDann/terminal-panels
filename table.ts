import chalk, { ChalkInstance } from 'chalk';
import stringWidth from 'string-width';

/**
 * Border style options for the table
 */
export type BorderStyle = 'single' | 'double' | 'rounded' | 'bold' | 'heavy' | 'none' | 'ascii';

/**
 * Column alignment options
 */
export type ColumnAlign = 'left' | 'center' | 'right';

/**
 * Column definition
 */
export interface Column {
  /** Column header text */
  header: string;
  /** Column alignment (default: 'left') */
  align?: ColumnAlign;
  /** Minimum column width */
  minWidth?: number;
  /** Maximum column width */
  maxWidth?: number;
  /** Header color */
  headerColor?: string | ChalkInstance;
  /** Column data color */
  columnColor?: string | ChalkInstance;
}

/**
 * Row cell data - can be string or object with color
 */
export type Cell = string | { text: string; color?: string | ChalkInstance };

/**
 * Table options
 */
export interface TableOptions {
  /** Table title (optional) */
  title?: string;
  /** Title color */
  titleColor?: string | ChalkInstance;
  /** Border style */
  borderStyle?: BorderStyle;
  /** Border color */
  borderColor?: string | ChalkInstance;
  /** Whether to show header row */
  showHeader?: boolean;
  /** Padding inside cells (left and right) */
  padding?: number;
  /** Whether to show row separators */
  showRowSeparator?: boolean;
  /** Expand table to full width */
  expand?: boolean;
  /** Fixed width for the table */
  width?: number;
  /** Make table take full width of parent container (useful for nesting in panels) */
  fullWidth?: boolean;
}

/**
 * Border character sets for different styles
 */
const BORDER_STYLES: Record<BorderStyle, {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
  horizontal: string;
  vertical: string;
  leftT: string;
  rightT: string;
  topT: string;
  bottomT: string;
  cross: string;
}> = {
  single: {
    topLeft: '┌', topRight: '┐', bottomLeft: '└', bottomRight: '┘',
    horizontal: '─', vertical: '│',
    leftT: '├', rightT: '┤', topT: '┬', bottomT: '┴', cross: '┼'
  },
  double: {
    topLeft: '╔', topRight: '╗', bottomLeft: '╚', bottomRight: '╝',
    horizontal: '═', vertical: '║',
    leftT: '╠', rightT: '╣', topT: '╦', bottomT: '╩', cross: '╬'
  },
  rounded: {
    topLeft: '╭', topRight: '╮', bottomLeft: '╰', bottomRight: '╯',
    horizontal: '─', vertical: '│',
    leftT: '├', rightT: '┤', topT: '┬', bottomT: '┴', cross: '┼'
  },
  bold: {
    topLeft: '┏', topRight: '┓', bottomLeft: '┗', bottomRight: '┛',
    horizontal: '━', vertical: '┃',
    leftT: '┣', rightT: '┫', topT: '┳', bottomT: '┻', cross: '╋'
  },
  heavy: {
    topLeft: '┏', topRight: '┓', bottomLeft: '┗', bottomRight: '┛',
    horizontal: '━', vertical: '┃',
    leftT: '┣', rightT: '┫', topT: '┳', bottomT: '┻', cross: '╋'
  },
  ascii: {
    topLeft: '+', topRight: '+', bottomLeft: '+', bottomRight: '+',
    horizontal: '-', vertical: '|',
    leftT: '+', rightT: '+', topT: '+', bottomT: '+', cross: '+'
  },
  none: {
    topLeft: ' ', topRight: ' ', bottomLeft: ' ', bottomRight: ' ',
    horizontal: ' ', vertical: ' ',
    leftT: ' ', rightT: ' ', topT: ' ', bottomT: ' ', cross: ' '
  }
};

/**
 * Table class for formatting tables in the terminal
 * Similar to Python's rich.console Table
 */
export class Table {
  private columns: Column[] = [];
  private rows: Cell[][] = [];
  private options: TableOptions;

  constructor(options: TableOptions = {}) {
    this.options = {
      borderStyle: 'single',
      showHeader: true,
      padding: 1,
      showRowSeparator: false,
      expand: false,
      ...options
    };
  }

  /**
   * Add a column to the table
   */
  addColumn(header: string, options: Omit<Column, 'header'> = {}): this {
    this.columns.push({
      header,
      align: options.align || 'left',
      ...options
    });
    return this;
  }

  /**
   * Add a row to the table
   */
  addRow(...cells: Cell[]): this {
    this.rows.push(cells);
    return this;
  }

  /**
   * Get chalk color instance from color string or ChalkInstance
   */
  private getChalkColor(color: string | ChalkInstance | undefined): ChalkInstance {
    if (!color) return chalk;
    if (typeof color === 'function') return color as ChalkInstance;

    // Named colors
    const namedColors: Record<string, ChalkInstance> = {
      black: chalk.black,
      red: chalk.red,
      green: chalk.green,
      yellow: chalk.yellow,
      blue: chalk.blue,
      magenta: chalk.magenta,
      cyan: chalk.cyan,
      white: chalk.white,
      gray: chalk.gray,
      grey: chalk.grey,
      brightRed: chalk.redBright,
      brightGreen: chalk.greenBright,
      brightYellow: chalk.yellowBright,
      brightBlue: chalk.blueBright,
      brightMagenta: chalk.magentaBright,
      brightCyan: chalk.cyanBright,
      brightWhite: chalk.whiteBright,
    };

    if (namedColors[color]) {
      return namedColors[color];
    }

    // Hex colors
    if (color.startsWith('#')) {
      return chalk.hex(color);
    }

    // RGB colors
    const rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (rgbMatch) {
      const [, r, g, b] = rgbMatch;
      return chalk.rgb(parseInt(r), parseInt(g), parseInt(b));
    }

    return chalk;
  }

  /**
   * Align text within a given width
   */
  private alignText(text: string, width: number, align: ColumnAlign): string {
    const textWidth = stringWidth(text);

    // Truncate text if it's too long
    if (textWidth > width) {
      // Truncate and add ellipsis
      let truncated = text;
      while (stringWidth(truncated) > width - 1 && truncated.length > 0) {
        truncated = truncated.slice(0, -1);
      }
      truncated = truncated + '…';
      // Make sure the final result fits
      while (stringWidth(truncated) > width && truncated.length > 1) {
        truncated = truncated.slice(0, -2) + '…';
      }
      return truncated + ' '.repeat(Math.max(0, width - stringWidth(truncated)));
    }

    if (textWidth >= width) return text;

    const padding = width - textWidth;

    switch (align) {
      case 'left':
        return text + ' '.repeat(padding);
      case 'right':
        return ' '.repeat(padding) + text;
      case 'center': {
        const leftPad = Math.floor(padding / 2);
        const rightPad = padding - leftPad;
        return ' '.repeat(leftPad) + text + ' '.repeat(rightPad);
      }
      default:
        return text;
    }
  }

  /**
   * Calculate column widths
   */
  private calculateColumnWidths(): number[] {
    const widths: number[] = [];

    // Initialize with header widths or minimum widths
    this.columns.forEach((column, i) => {
      let width = this.options.showHeader ? stringWidth(column.header) : 0;
      if (column.minWidth) {
        width = Math.max(width, column.minWidth);
      }
      widths[i] = width;
    });

    // Update with row cell widths
    this.rows.forEach(row => {
      row.forEach((cell, i) => {
        if (i >= this.columns.length) return; // Skip extra cells
        const cellText = typeof cell === 'string' ? cell : cell.text;
        const cellWidth = stringWidth(cellText);
        widths[i] = Math.max(widths[i] || 0, cellWidth);
      });
    });

    // Apply max width constraints
    this.columns.forEach((column, i) => {
      if (column.maxWidth && widths[i] > column.maxWidth) {
        widths[i] = column.maxWidth;
      }
    });

    // Handle table width options
    if (this.options.width || this.options.expand) {
      const padding = this.options.padding || 0;
      const separatorWidth = this.columns.length + 1; // vertical borders
      const paddingWidth = (padding * 2) * this.columns.length;
      const currentWidth = widths.reduce((sum, w) => sum + w, 0) + separatorWidth + paddingWidth;

      let targetWidth = currentWidth;

      if (this.options.width) {
        targetWidth = this.options.width;
      } else if (this.options.expand) {
        // For expand, use terminal width
        try {
          targetWidth = process.stdout.columns || currentWidth;
        } catch {
          targetWidth = currentWidth;
        }
      }

      if (targetWidth > currentWidth) {
        const extraSpace = targetWidth - currentWidth;
        const perColumn = Math.floor(extraSpace / this.columns.length);
        const remainder = extraSpace % this.columns.length;

        widths.forEach((w, i) => {
          widths[i] = w + perColumn + (i < remainder ? 1 : 0);
        });
      }
    }

    // Note: fullWidth option is kept for backward compatibility but doesn't force width
    // It allows the table to grow naturally to fit content, which works well when nested in panels

    return widths;
  }

  /**
   * Calculate the total inner width of the table (excluding left and right borders)
   */
  private calculateTotalInnerWidth(columnWidths: number[]): number {
    const padding = this.options.padding || 0;
    // Sum of column widths + padding on both sides of each column
    const columnsWidth = columnWidths.reduce((sum, w) => sum + w + (padding * 2), 0);
    // Add separators between columns (n-1 separators)
    const separatorsWidth = this.columns.length - 1;
    return columnsWidth + separatorsWidth;
  }

  /**
   * Render a horizontal line
   */
  private renderLine(
    left: string,
    middle: string,
    right: string,
    horizontal: string,
    columnWidths: number[]
  ): string {
    const borderColor = this.getChalkColor(this.options.borderColor);
    const padding = this.options.padding || 0;

    const parts = columnWidths.map(width =>
      horizontal.repeat(width + padding * 2)
    );

    return borderColor(left + parts.join(middle) + right);
  }

  /**
   * Render a row
   */
  private renderRow(
    cells: (string | { text: string; color?: string | ChalkInstance })[],
    columnWidths: number[],
    isHeader: boolean = false
  ): string {
    const borderStyle = BORDER_STYLES[this.options.borderStyle || 'single'];
    const borderColor = this.getChalkColor(this.options.borderColor);
    const padding = ' '.repeat(this.options.padding || 0);

    const renderedCells = cells.map((cell, i) => {
      if (i >= this.columns.length) return ''; // Skip extra cells

      const column = this.columns[i];
      const cellText = typeof cell === 'string' ? cell : cell.text;
      const cellColor = typeof cell === 'object' && cell.color
        ? this.getChalkColor(cell.color)
        : isHeader && column.headerColor
          ? this.getChalkColor(column.headerColor)
          : column.columnColor
            ? this.getChalkColor(column.columnColor)
            : chalk;

      const aligned = this.alignText(cellText, columnWidths[i], column.align || 'left');
      return padding + cellColor(aligned) + padding;
    });

    return borderColor(borderStyle.vertical) +
           renderedCells.join(borderColor(borderStyle.vertical)) +
           borderColor(borderStyle.vertical);
  }

  /**
   * Render the table
   */
  render(): string {
    if (this.columns.length === 0) {
      return '';
    }

    const lines: string[] = [];
    const borderStyle = BORDER_STYLES[this.options.borderStyle || 'single'];
    const columnWidths = this.calculateColumnWidths();

    // Title - rendered above the table with horizontal lines
    if (this.options.title) {
      const titleColor = this.getChalkColor(this.options.titleColor);
      const borderColor = this.getChalkColor(this.options.borderColor);
      const padding = this.options.padding || 0;

      // Calculate exact table width by measuring what renderLine produces
      const tableWidth = columnWidths.reduce((sum, w) => sum + w + (padding * 2), 0) + // content + padding
                        (this.columns.length - 1) + // separators between columns
                        2; // left and right borders

      // Calculate space for horizontal lines on either side of title
      const titleText = ` ${this.options.title} `;
      const titleWidth = stringWidth(titleText);
      const availableSpace = tableWidth - titleWidth;
      const leftLineWidth = Math.floor(availableSpace / 2);
      const rightLineWidth = availableSpace - leftLineWidth;

      // Create title line with horizontal borders on either side
      const leftLine = borderColor(borderStyle.horizontal.repeat(leftLineWidth));
      const rightLine = borderColor(borderStyle.horizontal.repeat(rightLineWidth));
      const coloredTitle = titleColor(titleText);

      lines.push(leftLine + coloredTitle + rightLine);
    }

    // Top border
    lines.push(this.renderLine(
      borderStyle.topLeft,
      borderStyle.topT,
      borderStyle.topRight,
      borderStyle.horizontal,
      columnWidths
    ));

    // Header row
    if (this.options.showHeader) {
      const headers = this.columns.map(col => col.header);
      lines.push(this.renderRow(headers, columnWidths, true));

      // Header separator
      lines.push(this.renderLine(
        borderStyle.leftT,
        borderStyle.cross,
        borderStyle.rightT,
        borderStyle.horizontal,
        columnWidths
      ));
    }

    // Data rows
    this.rows.forEach((row, index) => {
      lines.push(this.renderRow(row, columnWidths));

      // Row separator (if enabled and not the last row)
      if (this.options.showRowSeparator && index < this.rows.length - 1) {
        lines.push(this.renderLine(
          borderStyle.leftT,
          borderStyle.cross,
          borderStyle.rightT,
          borderStyle.horizontal,
          columnWidths
        ));
      }
    });

    // Bottom border
    lines.push(this.renderLine(
      borderStyle.bottomLeft,
      borderStyle.bottomT,
      borderStyle.bottomRight,
      borderStyle.horizontal,
      columnWidths
    ));

    return lines.join('\n');
  }

  /**
   * Render and print the table to console
   */
  print(): void {
    console.log(this.render());
  }
}

/**
 * Create and render a simple table with data
 */
export function createTable(
  columns: (string | Column)[],
  rows: Cell[][],
  options: TableOptions = {}
): string {
  const table = new Table(options);

  // Add columns
  columns.forEach(col => {
    if (typeof col === 'string') {
      table.addColumn(col);
    } else {
      table.addColumn(col.header, col);
    }
  });

  // Add rows
  rows.forEach(row => table.addRow(...row));

  return table.render();
}
