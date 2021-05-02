const blessed = require('blessed');
const db = require('./db');
const screen = require('./screen');
const { contentInput } = require('./input');
const selectedStore = require('./store');

const list = blessed.list({
  top: '7%',
  left: 1,
  width: '50%',
  height: '91%',
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
  items: db.get('notes').map('title').value(),
  parent: screen,
});

list.key('x', function() {
  const noteToDelete = db.get(`notes[${this.selected}]`).value();
  db.get('notes').remove({ title: noteToDelete.title }).write();
  list.removeItem(this.selected);
  list.render();
  screen.render();
});

list.key(['j', 'down'], function() {
  selectedStore.getState().inc();
  const selected = selectedStore.getState().selected;
  const notes = db.get('notes').value();
  contentInput.setValue(notes[selected].content)
  screen.render();
})

list.key(['k', 'up'], function() {
  selectedStore.getState().decr();
  const selected = selectedStore.getState().selected;
  const notes = db.get('notes').value();
  contentInput.setValue(notes[selected].content)
  screen.render();
})

list.key('enter', function() {
  contentInput.focus();
})

module.exports = list;
