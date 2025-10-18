import boxen, { type Options as BoxenOptions } from 'boxen';
import chalk, { type ChalkInstance } from 'chalk';

export type PanelType = 'info' | 'success' | 'warning' | 'error' | 'default';

export interface PanelOptions {
  type?: PanelType;
  color?: string;
  title?: string;
  messages: string[];
  padding?: number;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  borderStyle?: 'single' | 'double' | 'round' | 'bold' | 'singleDouble' | 'doubleSingle' | 'classic';
  fullWidth?: boolean;
  width?: number;
  textAlignment?: 'left' | 'center' | 'right';
}

/**
 * Get type-specific configuration (emoji and color)
 */
function getTypeConfig(type: PanelType): { emoji: string; color: string } {
  switch (type) {
    case 'info':
      return { emoji: '💡', color: 'blue' };
    case 'success':
      return { emoji: '✅', color: 'green' };
    case 'warning':
      return { emoji: '🔔', color: 'yellow' };
    case 'error':
      return { emoji: '❌', color: 'red' };
    case 'default':
    default:
      return { emoji: '✨', color: 'cyan' };
  }
}

/**
 * Creates and displays a formatted panel in the terminal with colored rounded borders.
 * Inspired by Python's rich.console package.
 *
 * @param options - Configuration options for the panel
 * @param options.type - Panel type (auto-sets emoji and color): 'info', 'success', 'warning', 'error', 'default' (default: 'default')
 * @param options.color - Border color (hex, rgb, or named color) - overrides type color
 * @param options.title - Title text (emoji added automatically based on type, unless title already starts with an emoji)
 * @param options.messages - Array of messages to display inside the panel
 * @param options.padding - Inner padding (default: 1)
 * @param options.margin - Outer margin for all sides (overridden by specific margins)
 * @param options.marginTop - Top margin (default: 1)
 * @param options.marginBottom - Bottom margin (default: 0)
 * @param options.marginLeft - Left margin (default: 0)
 * @param options.marginRight - Right margin (default: 0)
 * @param options.borderStyle - Border style (default: 'round')
 * @param options.fullWidth - Make panel span full terminal width (default: true)
 * @param options.width - Specific width for the panel (overrides fullWidth)
 * @param options.textAlignment - Text alignment inside the panel (default: 'left')
 */
export function Panel(options: PanelOptions): void {
  const {
    type = 'default',
    color,
    title = '',
    messages,
    padding = 1,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    borderStyle = 'round',
    fullWidth = true,
    width,
    textAlignment = 'left'
  } = options;

  // Get type-specific configuration
  const typeConfig = getTypeConfig(type);

  // Use type color if no color specified
  const finalColor = color || typeConfig.color;

  // Add emoji to title if title is provided and doesn't already start with an emoji
  // Check if title starts with an emoji by detecting common emoji ranges
  const startsWithEmoji = title && /^[\p{Emoji}\u200D]+/u.test(title);
  const finalTitle = title
    ? (startsWithEmoji ? title : `${typeConfig.emoji} ${title}`)
    : '';

  // Join messages with newlines
  const content = messages.join('\n');

  // Get the color function from chalk
  const colorFn = getChalkColor(finalColor);

  // Calculate margins - use specific margins if provided, otherwise use margin, otherwise defaults
  const finalMarginTop = marginTop !== undefined ? marginTop : (margin !== undefined ? margin : 1);
  const finalMarginBottom = marginBottom !== undefined ? marginBottom : (margin !== undefined ? margin : 0);
  const finalMarginLeft = marginLeft !== undefined ? marginLeft : (margin !== undefined ? margin : 0);
  const finalMarginRight = marginRight !== undefined ? marginRight : (margin !== undefined ? margin : 0);

  // Calculate width
  let panelWidth: number | undefined = width;
  if (fullWidth && !width) {
    // Use terminal width minus margin
    const terminalWidth = process.stdout.columns || 80;
    // Account for borders and horizontal margin
    panelWidth = terminalWidth - finalMarginLeft - finalMarginRight - 2;
  }

  // Create the boxen configuration
  const boxenOptions: BoxenOptions = {
    padding,
    margin: {
      top: finalMarginTop,
      bottom: finalMarginBottom,
      left: finalMarginLeft,
      right: finalMarginRight,
    },
    borderStyle,
    borderColor: finalColor as any,
    title: finalTitle ? colorFn(finalTitle) : undefined,
    titleAlignment: 'center' as const,
    textAlignment,
    width: panelWidth,
  };

  // Create and display the panel
  const panel = boxen(content, boxenOptions);
  console.log(panel);
}

/**
 * Helper function to get the appropriate chalk color function
 */
function getChalkColor(color: string): ChalkInstance {
  // Check if it's a hex color
  if (color.startsWith('#')) {
    return chalk.hex(color);
  }

  // Check if it's an rgb color
  if (color.startsWith('rgb')) {
    const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      return chalk.rgb(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
    }
  }

  // Otherwise, use named colors
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
  };

  return namedColors[color] || chalk.cyan;
}

// Example usage
if (import.meta.main) {
  Panel({
    color: 'cyan',
    title: 'Welcome',
    messages: [
      'This is a beautiful terminal panel!',
      'It has colored rounded borders.',
      'Perfect for CLI applications.'
    ]
  });

  Panel({
    color: '#FF6B6B',
    title: 'Error Report',
    messages: [
      'Something went wrong...',
      'Please check your configuration.',
      'Error code: 500'
    ],
    padding: 2,
    margin: 2
  });

  Panel({
    color: 'green',
    title: 'Success',
    messages: [
      '✓ All tests passed',
      '✓ Build completed',
      '✓ Deployment successful'
    ],
    borderStyle: 'double'
  });
}
