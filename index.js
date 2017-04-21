const coap = require('./lib/coap');
const mapDevice = require('./lib/mapdevice');

class Tradfri {
  constructor(key, url) {
    this.key = key;
    this.url = url;
  }

  getDeviceIds() {
    return coap(this.key, this.url);
  }

  async getDevices() {
    const devices = await this.getDeviceIds();

    const result = [];
    for (let deviceId of devices) {
      const device = await coap(this.key, this.url, deviceId);
      result.push(mapDevice(device));
    }

    return result;
  }

  static create(key, url) {
    return new Tradfri(key, url);
  }
}

module.exports = Tradfri;
