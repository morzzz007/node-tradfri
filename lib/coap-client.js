const exec = require('child_process').exec;
const CoapCommandBuilder = require('./command-builder');

class CoapClient {
  constructor(config) {
    const { coapClientPath, securityId, hubIpAddress } = config;
    this.commandBuilder = new CoapCommandBuilder(coapClientPath, securityId, hubIpAddress);
  }

  getDevices(deviceId) {
    const command = this.commandBuilder.get('device', deviceId);
    return this.constructor.makeRequest(command);
  }

  getGroups(groupId) {
    const command = this.commandBuilder.get('group', groupId);
    return this.constructor.makeRequest(command);
  }

  operate(type = 'device', id, operation) {
    const command = this.commandBuilder.put(type, id, operation);
    return this.constructor.makeRequest(command, false);
  }

  static makeRequest(command, parseResponse = true) {
    return new Promise((resolve, reject) => {
      exec(command, (err, stdOut) => {
        if (parseResponse) {
          if (stdOut) {
            resolve(JSON.parse(stdOut.split('\n')[3]));
          } else {
            reject('Failed to connect!');
          }
        } else {
          resolve({});
        }
      });
    });
  }

  static create(config) {
    return new CoapClient(config);
  }
}

module.exports = CoapClient;
