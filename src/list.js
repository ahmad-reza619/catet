const blessed = require('blessed');
const db = require('./db');
const screen = require('./screen');

const list = blessed.list({
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
  items: db.get('notes').map('title').value(),
  parent: screen,
});

module.exports = list;
