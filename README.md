# Terminal Panels

Beautiful terminal panels with colored rounded borders, inspired by Python's rich.console package.

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

See the [examples.ts](./examples.ts) file for more detailed examples.

## Features

- 🎯 **Panel types** - Quick status panels with `type` parameter (info, success, warning, error)
- 🎨 Colored borders (named colors, hex, RGB)
- 📦 Rounded and various border styles
- 📝 Centered titles with automatic emoji support
- ⚙️ Configurable padding and margins
- 📏 Full-width panels by default
- 🔤 Text alignment options (left, center, right)
- 🚀 Compatible with Bun and Deno
- 💪 TypeScript support
- ✨ Inspired by Python's rich.console
