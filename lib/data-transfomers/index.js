const get = require('lodash/get');

const transformRawDeviceData = (rawDeviceData) => {
  const device = {
    id: get(rawDeviceData, '9003'),
    name: get(rawDeviceData, '9001'),
    type: get(rawDeviceData, '3.1'),
  };

  device.on = !!get(rawDeviceData, '3311.[0].5850', 0);

  return device;
};

const transformRawGroupData = (rawGroupData) => {
  const group = {
    id: get(rawGroupData, '9003'),
    name: get(rawGroupData, '9001'),
    devices: get(rawGroupData, '9018.15002.9003'),
  };

  group.on = !!get(rawGroupData, '5850', 0);

  return group;
};

module.exports = {
  transformRawDeviceData,
  transformRawGroupData,
};
