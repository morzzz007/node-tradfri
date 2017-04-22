const get = require('lodash/get');

const mapDevice = (rawDeviceData) => {
  const device = {
    id: get(rawDeviceData, '9003'),
    name: get(rawDeviceData, '9001'),
    type: get(rawDeviceData, '3.1'),
  };

  device.on = !!get(rawDeviceData, '3311.[0].5850', 0);

  return device;
};

module.exports = mapDevice;
