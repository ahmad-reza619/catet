#!/usr/bin/env node
const blessed = require('blessed');
const notes = require('./src/db');
const screen = require('./src/screen');

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
  items: notes.map(n => n.title),
  parent: screen,
});


notesInput.on('submit', function() {
  notes.push({
    title: this.value,
    content: '',
  })
  notesListBox.addItem(this.value);
  screen.render();
});

screen.render();
notesListBox.focus();
