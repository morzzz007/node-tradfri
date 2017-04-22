const coapClient = require('./lib/coap-client.js');
const mapDevice = require('./lib/mapdevice');

class Tradfri {
  constructor(config) {
    this.coapClient = coapClient.create(config);
  }

  getDeviceIds() {
    return this.coapClient.get();
  }

  async getDevices() {
    const devices = await this.getDeviceIds();
    const result = [];

    for (let deviceId of devices) {
      const device = await this.coapClient.get(deviceId);
      result.push(mapDevice(device));
    }

    return result;
  }

  static create(config) {
    return new Tradfri(config);
  }
}

module.exports = Tradfri;
