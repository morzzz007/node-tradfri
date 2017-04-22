const get = require('lodash/get');

const mapGroup = (rawGroupData) => {
  const group = {
    id: get(rawGroupData, '9003'),
    name: get(rawGroupData, '9001'),
    devices: get(rawGroupData, '9018.15002.9003'),
  };

  group.on = !!get(rawGroupData, '5850', 0);

  return group;
};

module.exports = mapGroup;
