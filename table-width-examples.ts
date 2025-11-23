import { Table } from './table.js';

console.log('\n=== Table Width Behavior Examples ===\n');

// Example 1: Table with NO maxWidth - grows to fit content
console.log('Example 1: No maxWidth - Table grows naturally to fit long content');
const table1 = new Table({
  title: 'Table Growing Naturally',
  borderStyle: 'single',
  borderColor: 'green'
});
table1
  .addColumn('ID')
  .addColumn('Name')
  .addColumn('Description')  // No maxWidth - will grow to fit content
  .addRow('1', 'Alice', 'This is a very long description that will make the column grow')
  .addRow('2', 'Bob', 'Another long description to demonstrate natural table growth')
  .addRow('3', 'Charlie', 'Database connection timeout after 30 seconds - no truncation!');
table1.print();

// Example 2: Table WITH maxWidth - truncates content
console.log('\nExample 2: With maxWidth=40 - Content is truncated with ellipsis');
const table2 = new Table({
  title: 'Table with maxWidth Constraint',
  borderStyle: 'single',
  borderColor: 'yellow'
});
table2
  .addColumn('ID')
  .addColumn('Name')
  .addColumn('Description', { maxWidth: 40 })  // Limited to 40 chars
  .addRow('1', 'Alice', 'This is a very long description that will make the column grow')
  .addRow('2', 'Bob', 'Another long description to demonstrate natural table growth')
  .addRow('3', 'Charlie', 'Database connection timeout after 30 seconds - truncated here!');
table2.print();

// Example 3: Table with minWidth - ensures minimum width
console.log('\nExample 3: With minWidth=50 - Ensures minimum column width');
const table3 = new Table({
  title: 'Table with minWidth',
  borderStyle: 'single',
  borderColor: 'cyan'
});
table3
  .addColumn('ID')
  .addColumn('Name')
  .addColumn('Status', { minWidth: 50 })  // At least 50 chars wide
  .addRow('1', 'Alice', 'OK')
  .addRow('2', 'Bob', 'Active')
  .addRow('3', 'Charlie', 'Running');
table3.print();

console.log('\nKey Points:');
console.log('- Tables GROW naturally to fit content (Example 1)');
console.log('- maxWidth constraint causes truncation with ellipsis (Example 2)');
console.log('- minWidth ensures a minimum column width (Example 3)');
console.log('- Border alignment is maintained in all cases');

console.log('\n=== End of Examples ===\n');
