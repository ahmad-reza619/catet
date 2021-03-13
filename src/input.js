const blessed = require('blessed');
const screen = require('./screen');
const list = require('./list');
const db = require('./db');

const addForm = blessed.form({
  left: 1,
  width: '50%',
  height: 3,
  parent: screen,
  border: {
    type: 'line',
  },
});

const addInput = blessed.textbox({
  parent: addForm,
  inputOnFocus: true,
})

addInput.on('submit', function() {
  db
    .get('notes')
    .push({
      title: this.value,
      content: '',
    })
    .write();
  list.addItem(this.value);
  screen.render();
});

// Focus to input on a key pressed
screen.key('a', () => {
  addInput.clearValue();
  screen.render();
  addInput.focus()
});

module.exports = {
  addInput,
  addForm,
};
