const exec = require('child_process').exec;
const CoapCommandBuilder = require('./command-builder');

class CoapClient {
  constructor(config) {
    const { coapClientPath, securityId, hubIpAddress } = config;
    this.commandBuilder = new CoapCommandBuilder(coapClientPath, securityId, hubIpAddress);
  }

  async connect() {
    const command = this.commandBuilder.createNewDTLSIdentity();
    const result = await this.constructor.makeRequest(command, true);
    const preSharedKey = result['9091'];
    this.commandBuilder.setPreSharedKey(preSharedKey);
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
      exec(command, { timeout: 5000 }, (err, stdOut) => {
        if (parseResponse) {
          if (stdOut) {
            try {
              resolve(JSON.parse(stdOut.split('\n')[3]));
            } catch (errResponse) {
              reject(`Invalid response: ${errResponse}`);
            }
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
