import { Panel } from './panel.js';
import { Table } from './table.js';

console.log('\n=== Nesting Tables in Panels ===\n');

// Example 1: Basic table nested in a panel
console.log('Example 1: Table nested in a Panel');
const table1 = new Table({ borderStyle: 'single', borderColor: 'cyan' });
table1
  .addColumn('Product')
  .addColumn('Price', { align: 'right' })
  .addColumn('Stock', { align: 'center' })
  .addRow('Widget', '$19.99', { text: '✓', color: 'green' })
  .addRow('Gadget', '$49.99', { text: '✗', color: 'red' })
  .addRow('Doohickey', '$9.99', { text: '✓', color: 'green' });

Panel({
  type: 'info',
  title: 'Product Inventory',
  messages: [table1.render()],
  padding: 1
});

// Example 2: Multiple tables with fullWidth in a panel
console.log('\nExample 2: Full-width table in a Panel');
const table2 = new Table({
  borderStyle: 'rounded',
  borderColor: 'green',
  fullWidth: false
});
table2
  .addColumn('Name')
  .addColumn('Status', { align: 'center' })
  .addColumn('CPU', { align: 'right' })
  .addRow('web-01', { text: '● Online', color: 'green' }, '45%')
  .addRow('web-02', { text: '● Online', color: 'green' }, '23%')
  .addRow('db-01', { text: '○ Offline', color: 'red' }, 'N/A');

Panel({
  type: 'success',
  title: 'Server Status',
  messages: [table2.render()],
  padding: 1,
  borderStyle: 'double'
});

// Example 3: Side-by-side data in panel
console.log('\nExample 3: Compact table in Panel');
const table3 = new Table({
  title: 'System Metrics',
  titleColor: 'yellow',
  borderStyle: 'bold',
  borderColor: 'yellow',
  padding: 2
});
table3
  .addColumn('Metric', { headerColor: 'cyan' })
  .addColumn('Value', { headerColor: 'cyan', align: 'right' })
  .addRow('CPU Usage', { text: '45%', color: 'green' })
  .addRow('Memory', { text: '78%', color: 'yellow' })
  .addRow('Disk', { text: '92%', color: 'red' })
  .addRow('Network', { text: '12%', color: 'green' });

Panel({
  type: 'warning',
  title: 'System Dashboard',
  messages: [table3.render()],
  padding: 1
});

// Example 4: Error log table in error panel
console.log('\nExample 4: Error Log Table');
const errorTable = new Table({
  borderStyle: 'single',
  borderColor: 'red',
  showRowSeparator: true
});
errorTable
  .addColumn('Time', { minWidth: 10 })
  .addColumn('Level', { align: 'center', columnColor: 'red' })
  .addColumn('Message', { minWidth: 30 })
  .addRow('10:30:45', 'ERROR', 'Database connection failed')
  .addRow('10:31:02', 'ERROR', 'Timeout after 30 seconds')
  .addRow('10:31:15', 'FATAL', 'Unable to recover');

Panel({
  type: 'error',
  title: 'Critical Errors',
  messages: [errorTable.render()],
  padding: 1,
  borderStyle: 'bold'
});

console.log('\n=== End of Examples ===\n');
