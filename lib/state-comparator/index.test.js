const { stateComparator } = require('./');

describe('stateComparator', () => {
  test('should return only the changed devices', () => {
    const oldState = [{
      id: 1,
      on: true
    }, {
      id: 2,
      on: false
    }, {
      id: 3,
      on: true
    }];

    const newState = [{
      id: 1,
      on: false
    }, {
      id: 2,
      on: true
    }, {
      id: 3,
      on: true
    }]

    expect(stateComparator(oldState, newState)).toEqual([
      [{ id: 1, on: true }, { id: 1, on: false }],
      [{ id: 2, on: false }, { id: 2, on: true }],
    ]);
  });

  test('should only return devices found in the previous state', () => {
    const oldState = [{
      id: 1,
      on: true
    }];

    const newState = [{
      id: 1,
      on: false
    }, {
      id: 2,
      on: true
    }]

    expect(stateComparator(oldState, newState)).toEqual([
      [{ id: 1, on: true }, { id: 1, on: false }],
    ]);
  });
});
