const coapClient = require('./lib/coap-client.js');
const mapDevice = require('./lib/mapdevice');
const mapGroup = require('./lib/mapgroup');

class Tradfri {
  constructor(config) {
    this.coapClient = coapClient.create(config);
  }

  getDeviceIds() {
    return this.coapClient.getDevices();
  }

  getGroupIds() {
    return this.coapClient.getGroups();
  }

  async getDevices() {
    const devices = await this.getDeviceIds();
    const result = [];

    for (let deviceId of devices) {
      const device = await this.coapClient.getDevices(deviceId);
      result.push(mapDevice(device));
    }

    return result;
  }

  async getGroups() {
    const groups = await this.getGroupIds();
    const result = [];

    for (let groupId of groups) {
      const group = await this.coapClient.getGroups(groupId);
      const mappedData = mapGroup(group);

      const devicesInGroup = [];
      for (let deviceId of mappedData.devices) {
        const deviceData = await this.coapClient.getDevices(deviceId);
        devicesInGroup.push(mapDevice(deviceData));
      }

      mappedData.devices = devicesInGroup;
      result.push(mappedData);
    }


    return result;
  }

  static create(config) {
    return new Tradfri(config);
  }
}

module.exports = Tradfri;
