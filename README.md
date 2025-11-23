# Terminal Panels

Beautiful terminal panels and tables with colored borders, inspired by Python's rich.console package. Panels leverage the great work by Sindre Sorhus' boxen package.

[![npm version](https://img.shields.io/npm/v/terminal-panels.svg)](https://www.npmjs.com/package/terminal-panels)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install terminal-panels
```

Or with other package managers:

```bash
# pnpm
pnpm add terminal-panels

# yarn
yarn add terminal-panels

# bun
bun add terminal-panels
```

## Usage

### Quick Start with Types

The easiest way to create panels is using the `type` parameter:

```typescript
import { Panel } from 'terminal-panels';

// Success panel - automatically gets ✅ emoji and green color
Panel({
  type: 'success',
  title: 'Build Complete',
  messages: [
    '✓ All tests passed',
    '✓ Build completed successfully'
  ]
});

// Error panel - automatically gets ❌ emoji and red color
Panel({
  type: 'error',
  title: 'Build Failed',
  messages: [
    'Something went wrong...',
    'Please check your configuration.'
  ]
});

// Available types: 'info', 'success', 'warning', 'error', 'default'
```

### Basic Example

```typescript
Panel({
  color: 'cyan',
  title: '🚀 Welcome',
  messages: [
    'This is a beautiful terminal panel!',
    'It has colored rounded borders.',
    'Perfect for CLI applications.'
  ]
});
```

### Advanced Example

```typescript
Panel({
  type: 'warning',            // Sets emoji and color automatically
  title: 'Deprecation Notice',
  messages: [
    'This feature will be removed in v2.0',
    'Please update your code'
  ],
  padding: 2,                 // Inner padding
  borderStyle: 'double'       // Different border styles
});
```

### Full-Width Example

```typescript
Panel({
  color: 'green',
  title: '✅ Success',
  messages: [
    '✓ All tests passed',
    '✓ Build completed successfully',
    '✓ Deployment finished'
  ],
  fullWidth: true,            // Span full terminal width
  borderStyle: 'double'
});
```

## API

### `Panel(options: PanelOptions): void`

Creates and displays a formatted panel in the terminal.

#### Options

- `type` (string, optional): Panel type that auto-sets emoji and color
  - Options: `'info'` (💡 blue), `'success'` (✅ green), `'warning'` (🔔 yellow), `'error'` (❌ red), `'default'` (✨ cyan)
  - Automatically adds emoji to title and sets color (unless color is explicitly provided)
  - If title already starts with an emoji, the type emoji is not added (prevents double emojis)
  - Default: `'default'`

- `color` (string, optional): Border color. Supports:
  - Named colors: `'red'`, `'green'`, `'blue'`, `'cyan'`, `'magenta'`, `'yellow'`, `'white'`, `'gray'`
  - Bright colors: `'brightRed'`, `'brightGreen'`, etc.
  - Hex colors: `'#FF6B6B'`
  - RGB colors: `'rgb(255, 107, 107)'`
  - Overrides type color if both are provided
  - Default: `'cyan'` (or type-specific color if type is set)

- `title` (string, optional): Title text (emoji added automatically if type is set)
  - Default: `''`

- `messages` (string[], required): Array of messages to display inside the panel

- `padding` (number, optional): Inner padding around the content
  - Default: `1`

- `margin` (number, optional): Outer margin around the panel
  - Default: `0`

- `borderStyle` (string, optional): Style of the border
  - Options: `'single'`, `'double'`, `'round'`, `'bold'`, `'singleDouble'`, `'doubleSingle'`, `'classic'`
  - Default: `'round'`

- `fullWidth` (boolean, optional): Make the panel span the full width of the terminal
  - Default: `true`

- `width` (number, optional): Specific width for the panel (overrides fullWidth)
  - Default: `undefined`

- `textAlignment` (string, optional): Text alignment inside the panel
  - Options: `'left'`, `'center'`, `'right'`
  - Default: `'left'`

## Examples

See the [examples.ts](./examples.ts) file for more detailed panel examples.

---

## Tables

Terminal Panels also includes a powerful `Table` module for creating beautiful tables in the terminal, similar to Python's rich.console Table.

### Quick Start

```typescript
import { Table } from 'terminal-panels/table';

const table = new Table();
table
  .addColumn('Name')
  .addColumn('Age')
  .addColumn('City')
  .addRow('Alice', '30', 'New York')
  .addRow('Bob', '25', 'London')
  .addRow('Charlie', '35', 'Tokyo');

table.print();
```

Output:
```
┌─────────┬─────┬──────────┐
│    Name   Age   City     │
├─────────┼─────┼──────────┤
│ Alice   │ 30  │ New York │
│ Bob     │ 25  │ London   │
│ Charlie │ 35  │ Tokyo    │
└─────────┴─────┴──────────┘
```

Note: Headers are rendered with solid borders (not divided by columns) and centrally aligned for a cleaner appearance.

### Table with Title and Colors

```typescript
import { Table } from 'terminal-panels/table';
import chalk from 'chalk';

const table = new Table({
  title: 'User Status',
  titleColor: chalk.bold.cyan,
  borderColor: 'cyan',
  borderStyle: 'rounded'
});

table
  .addColumn('Name', { headerColor: 'yellow' })
  .addColumn('Status', { headerColor: 'yellow', align: 'center' })
  .addColumn('Score', { headerColor: 'yellow', align: 'right' })
  .addRow('Alice', { text: 'Active', color: 'green' }, '95')
  .addRow('Bob', { text: 'Inactive', color: 'red' }, '72')
  .addRow('Charlie', { text: 'Active', color: 'green' }, '88');

table.print();
```

### Helper Function

```typescript
import { createTable } from 'terminal-panels/table';

const table = createTable(
  ['Language', 'Year', 'Paradigm'],
  [
    ['JavaScript', '1995', 'Multi-paradigm'],
    ['Python', '1991', 'Multi-paradigm'],
    ['Rust', '2010', 'Multi-paradigm']
  ],
  { borderStyle: 'double', borderColor: 'magenta' }
);

console.log(table);
```

### Nesting Tables in Panels

You can nest tables inside panels for beautiful combined output:

```typescript
import { Panel } from 'terminal-panels';
import { Table } from 'terminal-panels/table';

const table = new Table({ borderStyle: 'single', borderColor: 'cyan' });
table
  .addColumn('Product')
  .addColumn('Price', { align: 'right' })
  .addColumn('Stock', { align: 'center' })
  .addRow('Widget', '$19.99', { text: '✓', color: 'green' })
  .addRow('Gadget', '$49.99', { text: '✗', color: 'red' });

Panel({
  type: 'info',
  title: 'Product Inventory',
  messages: [table.render()],
  padding: 1
});
```

## Table API

### `Table` Class

#### Constructor

```typescript
new Table(options?: TableOptions)
```

#### Methods

- `addColumn(header: string, options?: ColumnOptions): this`
  - Adds a column to the table
  - Returns `this` for method chaining

- `addRow(...cells: Cell[]): this`
  - Adds a row of data to the table
  - Each cell can be a string or `{ text: string, color?: string | ChalkInstance }`
  - Returns `this` for method chaining

- `render(): string`
  - Renders the table and returns it as a string

- `print(): void`
  - Renders and prints the table to console

#### TableOptions

- `title` (string, optional): Table title displayed at the top
- `titleColor` (string | ChalkInstance, optional): Color for the title
- `borderStyle` (BorderStyle, optional): Border style
  - Options: `'single'`, `'double'`, `'rounded'`, `'bold'`, `'heavy'`, `'ascii'`, `'none'`
  - Default: `'single'`
- `borderColor` (string | ChalkInstance, optional): Color for borders
- `showHeader` (boolean, optional): Whether to show the header row
  - Default: `true`
- `padding` (number, optional): Padding inside cells (left and right)
  - Default: `1`
- `showRowSeparator` (boolean, optional): Whether to show separators between rows
  - Default: `false`
- `expand` (boolean, optional): Expand table to full terminal width (forces terminal width)
  - Default: `false`
- `width` (number, optional): Fixed width for the table
- `fullWidth` (boolean, optional): Allows table to grow naturally to fit content (useful for nesting in panels)
  - Note: Unlike `expand`, this doesn't force terminal width, making it safe for nested tables
  - Default: `false`

#### ColumnOptions

- `align` (ColumnAlign, optional): Column alignment
  - Options: `'left'`, `'center'`, `'right'`
  - Default: `'left'`
- `minWidth` (number, optional): Minimum column width
- `maxWidth` (number, optional): Maximum column width
- `headerColor` (string | ChalkInstance, optional): Color for column header
- `columnColor` (string | ChalkInstance, optional): Default color for cells in this column

#### Cell Type

```typescript
type Cell = string | { text: string; color?: string | ChalkInstance }
```

### `createTable` Helper Function

```typescript
createTable(
  columns: (string | Column)[],
  rows: Cell[][],
  options?: TableOptions
): string
```

Convenience function to create and render a table in one call.

## Table Examples

See the [table-examples.ts](./table-examples.ts) file for more detailed table examples including:
- Basic tables
- Tables with titles and colors
- Different border styles
- Column alignment
- Row separators
- Server status dashboards
- Color variations (hex, RGB, named)
- Column width constraints

See the [nested-table-example.ts](./nested-table-example.ts) file for examples of nesting tables within panels.

## Features

### Panels
- 🎯 **Panel types** - Quick status panels with `type` parameter (info, success, warning, error)
- 🎨 Colored borders (named colors, hex, RGB)
- 📦 Rounded and various border styles
- 📝 Centered titles with automatic emoji support
- ⚙️ Configurable padding and margins
- 📏 Full-width panels by default
- 🔤 Text alignment options (left, center, right)

### Tables
- 📊 **Rich tables** - Format data in beautiful terminal tables
- 🎨 Colored borders, headers, and cells (named colors, hex, RGB)
- 📦 Multiple border styles (single, double, rounded, bold, ascii, none)
- 📐 Column alignment (left, center, right)
- 📏 Auto-calculated column widths with min/max constraints
- 🔲 Row separators
- 📝 Table titles
- ⚙️ Configurable padding
- 💡 Simple helper function for quick tables
- 🔗 **Nestable in panels** - Tables work perfectly when nested within panels
- 📐 fullWidth option for natural growth (safe for nesting)
- 🖥️ expand option for forcing terminal width expansion
- ✨ Similar to Python's rich.console Table

### General
- 🚀 Compatible with Bun and Deno
- 💪 TypeScript support
- ✨ Inspired by Python's rich.console
