#!/usr/bin/env node
const screen = require('./src/screen');
const list = require('./src/list');
const { addForm, addInput } = require('./src/input');

function main() {
  screen.render();
  list.focus();
  addForm.render();
  addInput.render()
}

main();
