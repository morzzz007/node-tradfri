/* eslint-disable no-await-in-loop */

const isUndefined = require('lodash/isUndefined');
const coapClient = require('./lib/coap-client.js');
const { transformRawDeviceData, transformRawGroupData } = require('./lib/data-transfomers');

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
      result.push(transformRawDeviceData(device));
    }

    return result;
  }

  async getGroups() {
    const groups = await this.getGroupIds();
    const result = [];

    for (let groupId of groups) {
      const group = await this.coapClient.getGroups(groupId);
      const mappedData = transformRawGroupData(group);

      const devicesInGroup = [];
      for (let deviceId of mappedData.devices) {
        const deviceData = await this.coapClient.getDevices(deviceId);
        devicesInGroup.push(transformRawDeviceData(deviceData));
      }

      mappedData.devices = devicesInGroup;
      result.push(mappedData);
    }

    return result;
  }

  turnOnDevice(deviceId) {
    return this.coapClient.operate('device', deviceId, { state: 'on' });
  }

  turnOffDevice(deviceId) {
    return this.coapClient.operate('device', deviceId, { state: 'off' });
  }

  async toggleDevice(deviceId, state) {
    const device = transformRawDeviceData(await this.coapClient.getDevices(deviceId));
    if (isUndefined(state)) {
      if (device.on) {
        return this.turnOffDevice(deviceId);
      }
      return this.turnOnDevice(deviceId);
    }

    if (state) {
      return this.turnOnDevice(deviceId);
    }

    return this.turnOffDevice(deviceId);
  }

  setDeviceState(deviceId, properties) {
    return this.coapClient.operate('device', deviceId, properties);
  }

  turnOnGroup(groupId) {
    return this.coapClient.operate('group', groupId, { state: 'on' });
  }

  turnOffGroup(groupId) {
    return this.coapClient.operate('group', groupId, { state: 'off' });
  }

  async toggleGroup(groupId, state) {
    const group = transformRawGroupData(await this.coapClient.getGroups(groupId));

    if (isUndefined(state)) {
      if (group.on) {
        return this.turnOffGroup(groupId);
      }
      return this.turnOnGroup(groupId);
    }

    if (state) {
      return this.turnOnGroup(groupId);
    }

    return this.turnOffGroup(groupId);
  }

  setGroupState(groupId, properties) {
    return this.coapClient.operate('group', groupId, properties);
  }

  static create(config) {
    return new Tradfri(config);
  }
}

module.exports = Tradfri;
