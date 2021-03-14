const create = require('zustand/vanilla').default;
const db = require('./db');

const selectedStore = create(set => ({
  selected: 0,
  inc: () => {
    set(({ selected }) => {
      const itemsLength = db.get('notes').value().length - 1;
      if (selected === itemsLength) {
        return { selected };
      }
      return { selected: selected + 1 };
    })
  },
  decr: () => {
    set(({ selected }) => {
      if (selected === 0) {
        return { selected };
      }
      return { selected: selected - 1 };
    })
  },
}));

module.exports = selectedStore;
