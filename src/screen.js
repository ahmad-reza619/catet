const blessed = require('blessed');

const screen = blessed.screen({
  smartCSR: true,
  autoPadding: true,
});

screen.title = 'Catet | Simple TUI Notes Taking App';

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

module.exports = screen;
