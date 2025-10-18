import { Panel } from './panel.ts';

console.log('\n🎨 Terminal Panel Examples (Full Width)\n');

// Example 1: Welcome Panel with custom color and emoji
Panel({
  color: 'cyan',
  title: '🚀 Welcome',
  messages: [
    'This is a beautiful terminal panel!',
    'It has colored rounded borders.',
    'Perfect for CLI applications.'
  ]
});

// Example 2: Error Panel using type
Panel({
  type: 'error',
  title: 'Build Failed',
  messages: [
    'Something went wrong...',
    'Please check your configuration.',
    'Error code: 500'
  ]
});

// Example 3: Success Panel using type with double border
Panel({
  type: 'success',
  title: 'Deployment Complete',
  messages: [
    '✓ All tests passed',
    '✓ Build completed successfully',
    '✓ Deployment finished'
  ],
  borderStyle: 'double'
});

// Example 4: Warning Panel using type
Panel({
  type: 'warning',
  title: 'Deprecation Notice',
  messages: [
    'Deprecated API usage detected',
    'Please update to the latest version',
    'Support ends in 30 days'
  ]
});

// Example 5: Info Panel using type
Panel({
  type: 'info',
  title: 'Server Status',
  messages: [
    'Server running on http://localhost:3000',
    'Environment: development',
    'Node version: 20.10.0'
  ]
});

// Example 6: Custom color with custom emoji
Panel({
  color: 'magenta',
  title: '🎯 Task List',
  messages: [
    '[ ] Review pull requests',
    '[ ] Update documentation',
    '[✓] Fix security issues',
    '[✓] Deploy to staging'
  ],
  borderStyle: 'bold'
});

// Example 7: Success with custom hex color override
Panel({
  type: 'success',
  color: '#00FF00',
  title: 'Revenue Report',
  messages: [
    'Monthly Revenue: $125,000',
    'Growth: +15% MoM',
    'New Customers: 234'
  ],
  borderStyle: 'double'
});

// Example 8: Default type panel (no type specified)
Panel({
  title: 'AI Insights',
  messages: [
    'Model accuracy: 94.2%',
    'Training time: 2.5 hours',
    'Dataset size: 1.2M samples'
  ]
});

// Example 9: Error with single border style
Panel({
  type: 'error',
  title: 'Critical Alert',
  messages: [
    'High memory usage detected!',
    'Current usage: 95%',
    'Immediate action required'
  ],
  borderStyle: 'single'
});

// Example 10: Info panel with multi-line messages
Panel({
  type: 'info',
  title: 'System Status',
  messages: [
    'All systems operational',
    '',
    'API Response Time: 42ms',
    'Database Connections: 12/100',
    'Cache Hit Rate: 98.5%',
    '',
    'Last updated: ' + new Date().toLocaleTimeString()
  ]
});

console.log('\n✨ Examples complete!\n');
