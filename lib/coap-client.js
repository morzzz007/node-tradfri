const exec = require('child_process').exec;
const coapCommandBuilder = require('./coap-command-builder');

class CoapClient {
  constructor(config) {
    const { coapClientPath, securityId, hubIpAddress } = config;
    this.commandBuilder = coapCommandBuilder.create(coapClientPath, securityId, hubIpAddress);
  }

  getDevices(deviceId) {
    const command = this.commandBuilder.get('device', deviceId);
    return this.makeRequest(command);
  }

  getGroups(groupId) {
    const command = this.commandBuilder.get('group', groupId);
    return this.makeRequest(command);
  }

  makeRequest(command) {
    return new Promise((resolve, reject) => {
      exec(command, (err, stdOut) => {
        if (stdOut) {
          resolve(JSON.parse(stdOut.split('\n')[3]));
        } else {
          reject('Failed to connect!');
        }
      });
    });
  }

  static create(config) {
    return new CoapClient(config);
  }
}

module.exports = CoapClient;
