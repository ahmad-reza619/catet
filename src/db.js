const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapters = new FileSync('db.json');
const db = low(adapters);

const notes = [
  {
    title: 'test',
    content: 'very long string',
  },
  {
    title: 'test 2',
    content: 'WOOOOOWWW',
  },
];

db.defaults({ notes }).write();

module.exports = db;
