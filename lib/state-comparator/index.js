const forIn = require('lodash/forIn');

const stateComparator = (oldState, newState) => {
  const result = [];

  newState.forEach(newValue => {
    const previousValue = oldState.find(oldValue => oldValue.id === newValue.id);

    if(previousValue && hasDifferentValues(previousValue, newValue)) {
      result.push([previousValue, newValue]);
    }
  });

  return result;
};

const hasDifferentValues = (obj1, obj2) => {
  let different = false;

  forIn(obj1, (value, key) => {
    if(obj1[key] !== obj2[key]) different = true;
  })

  return different;
}

module.exports = {
  stateComparator,
};
