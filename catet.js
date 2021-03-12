#!/usr/bin/env node
const blessed = require('blessed');

const fakeNotes = [
  {
    title: 'test',
    content: 'very long string',
  },
  {
    title: 'test 2',
    content: 'WOOOOOWWW',
  },
];

const screen = blessed.screen({
  smartCSR: true,
  autoPadding: true,
});

screen.title = 'Catet | Simple TUI Notes Taking App';

const notesListBox = blessed.list({
  top: 1,
  left: 1,
  width: '50%',
  height: '90%',
  tags: true,
  border: {
    type: 'line'
  },
  padding: 1,
  style: {
    border: {
      fg: '#fff'
    },
    hover: {
      bg: 'green'
    },
    selected: {
      bg: 'white',
      fg: 'black',
    }
  },
  keys: true,
  vi: true,
  search: true,
  items: fakeNotes.map(n => n.title),
});

screen.append(notesListBox);

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

screen.render();
notesListBox.focus();
