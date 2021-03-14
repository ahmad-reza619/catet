const blessed = require('blessed');
const screen = require('./screen');
const list = require('./list');
const db = require('./db');
const selectedStore = require('./store');

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

const contentForm = blessed.form({
  parent: screen,
  left: '51%',
  height: '97%',
  border: {
    type: 'line',
  },
});

const contentInput = blessed.textbox({
  parent: contentForm,
  inputOnFocus: true,
});

contentInput.setValue(db.get('notes').value()[0].content);

contentInput.submit(() => {
  const value = contentInput.getValue();
  db.set(`notes[${selectedStore.getState().selected}].content`, value).write();
  screen.render();
});

module.exports = {
  addInput,
  addForm,
  contentForm,
  contentInput,
};
