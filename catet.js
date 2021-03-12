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

const notesForm = blessed.form({
  left: 1,
  width: '50%',
  height: 3,
  parent: screen,
  border: {
    type: 'line',
  },
});

const notesInput = blessed.textbox({
  parent: notesForm,
  inputOnFocus: true,
})

const notesListBox = blessed.list({
  top: 3,
  left: 1,
  width: '50%',
  height: '90%',
  tags: true,
  border: {
    type: 'line'
  },
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
  parent: screen,
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

screen.key('a', () => {
  notesInput.clearValue();
  screen.render();
  notesInput.focus()
});

notesInput.on('submit', function() {
  fakeNotes.push({
    title: this.value,
    content: '',
  })
  notesListBox.addItem(this.value);
  screen.render();
});

screen.render();
notesListBox.focus();
