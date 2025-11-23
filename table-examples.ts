import { Table, createTable } from './table.js';
import chalk from 'chalk';

console.log('\n=== Table Module Examples ===\n');

// Example 1: Basic table
console.log('Example 1: Basic Table');
const table1 = new Table();
table1
  .addColumn('Name')
  .addColumn('Age')
  .addColumn('City')
  .addRow('Alice', '30', 'New York')
  .addRow('Bob', '25', 'London')
  .addRow('Charlie', '35', 'Tokyo');
table1.print();

// Example 2: Table with title and colors
console.log('\nExample 2: Table with Title and Colors');
const table2 = new Table({
  title: 'User Information',
  titleColor: chalk.bold.cyan,
  borderColor: 'cyan',
  borderStyle: 'rounded'
});
table2
  .addColumn('Name', { headerColor: 'brightYellow' })
  .addColumn('Status', { headerColor: 'brightYellow', align: 'center' })
  .addColumn('Score', { headerColor: 'brightYellow', align: 'right' })
  .addRow('Alice', { text: 'Active', color: 'green' }, '95')
  .addRow('Bob', { text: 'Inactive', color: 'red' }, '72')
  .addRow('Charlie', { text: 'Active', color: 'green' }, '88');
table2.print();

// Example 3: Different border styles
console.log('\nExample 3: Border Styles');
const borderStyles = ['single', 'double', 'rounded', 'bold', 'ascii'] as const;
borderStyles.forEach(style => {
  const table = new Table({ borderStyle: style, showHeader: false });
  table
    .addColumn('Style')
    .addColumn('Example')
    .addRow(style, 'Sample text');
  console.log(table.render());
});

// Example 4: Column alignment
console.log('\nExample 4: Column Alignment');
const table4 = new Table({
  title: 'Product Prices',
  borderStyle: 'double',
  borderColor: 'magenta'
});
table4
  .addColumn('Product', { align: 'left', headerColor: 'yellow' })
  .addColumn('Quantity', { align: 'center', headerColor: 'yellow' })
  .addColumn('Price', { align: 'right', headerColor: 'yellow' })
  .addRow('Widget', '10', '$19.99')
  .addRow('Gadget', '5', '$49.99')
  .addRow('Doohickey', '25', '$9.99');
table4.print();

// Example 5: Row separators
console.log('\nExample 5: Row Separators');
const table5 = new Table({
  borderStyle: 'bold',
  showRowSeparator: true,
  borderColor: 'green'
});
table5
  .addColumn('Task', { columnColor: 'cyan' })
  .addColumn('Status', { align: 'center' })
  .addColumn('Priority', { align: 'center' })
  .addRow('Implement feature X', { text: '✓', color: 'green' }, { text: 'High', color: 'red' })
  .addRow('Fix bug Y', { text: '○', color: 'yellow' }, { text: 'Medium', color: 'yellow' })
  .addRow('Update docs', { text: '✓', color: 'green' }, { text: 'Low', color: 'blue' });
table5.print();

// Example 6: Complex data with colors
console.log('\nExample 6: Server Status Dashboard');
const table6 = new Table({
  title: '🖥️  Server Status',
  titleColor: chalk.bold.white,
  borderStyle: 'rounded',
  borderColor: 'gray',
  padding: 2
});
table6
  .addColumn('Server', { headerColor: chalk.bold, align: 'left' })
  .addColumn('Status', { headerColor: chalk.bold, align: 'center' })
  .addColumn('CPU', { headerColor: chalk.bold, align: 'right' })
  .addColumn('Memory', { headerColor: chalk.bold, align: 'right' })
  .addColumn('Uptime', { headerColor: chalk.bold, align: 'right' })
  .addRow(
    'web-01',
    { text: '● Online', color: 'green' },
    { text: '45%', color: 'green' },
    { text: '62%', color: 'yellow' },
    '23d 5h'
  )
  .addRow(
    'web-02',
    { text: '● Online', color: 'green' },
    { text: '23%', color: 'green' },
    { text: '41%', color: 'green' },
    '45d 12h'
  )
  .addRow(
    'db-01',
    { text: '● Online', color: 'green' },
    { text: '78%', color: 'yellow' },
    { text: '89%', color: 'red' },
    '12d 8h'
  )
  .addRow(
    'cache-01',
    { text: '○ Offline', color: 'red' },
    { text: 'N/A', color: 'gray' },
    { text: 'N/A', color: 'gray' },
    'N/A'
  );
table6.print();

// Example 7: Simple helper function
console.log('\nExample 7: Using createTable Helper');
const simpleTable = createTable(
  ['Language', 'Year', 'Paradigm'],
  [
    ['JavaScript', '1995', 'Multi-paradigm'],
    ['Python', '1991', 'Multi-paradigm'],
    ['Rust', '2010', 'Multi-paradigm'],
    ['Go', '2009', 'Procedural']
  ],
  { borderStyle: 'single', borderColor: 'cyan' }
);
console.log(simpleTable);

// Example 8: No borders
console.log('\nExample 8: Table without Borders');
const table8 = new Table({
  borderStyle: 'none',
  padding: 2
});
table8
  .addColumn('Name', { headerColor: chalk.underline })
  .addColumn('Value', { headerColor: chalk.underline, align: 'right' })
  .addRow('Setting 1', '42')
  .addRow('Setting 2', '100')
  .addRow('Setting 3', '256');
table8.print();

// Example 9: Color variations
console.log('\nExample 9: Different Color Formats');
const table9 = new Table({
  borderStyle: 'rounded',
  borderColor: '#FF6B6B'
});
table9
  .addColumn('Type', { headerColor: chalk.hex('#4ECDC4') })
  .addColumn('Example', { headerColor: chalk.hex('#4ECDC4') })
  .addRow({ text: 'Hex Color', color: '#FF6B6B' }, '#FF6B6B')
  .addRow({ text: 'RGB Color', color: 'rgb(78, 205, 196)' }, 'rgb(78, 205, 196)')
  .addRow({ text: 'Named Color', color: 'magenta' }, 'magenta')
  .addRow({ text: 'Chalk Instance', color: chalk.bold.yellow }, 'chalk.bold.yellow');
table9.print();

// Example 10: Wide content with column constraints
console.log('\nExample 10: Column Width Constraints');
const table10 = new Table({
  title: 'Log Entries',
  borderStyle: 'single',
  borderColor: 'gray'
});
table10
  .addColumn('Time', { align: 'left', minWidth: 10 })
  .addColumn('Level', { align: 'center', minWidth: 8, headerColor: 'yellow' })
  .addColumn('Message', { minWidth: 30, maxWidth: 40 })
  .addRow('10:30:45', { text: 'INFO', color: 'blue' }, 'Application started successfully')
  .addRow('10:30:48', { text: 'WARN', color: 'yellow' }, 'Cache miss for key: user_data_12345')
  .addRow('10:31:02', { text: 'ERROR', color: 'red' }, 'Database connection timeout after 30 seconds');
table10.print();

console.log('\n=== End of Examples ===\n');
