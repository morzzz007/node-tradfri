const exec = require('child_process').exec;
const CoapCommandBuilder = require('./command-builder');
const uuidv1 = require('uuid/v1');

class CoapClient {
  constructor(config) {
    const { coapClientPath, securityId, hubIpAddress, identity, preSharedKey } = config;
    this.commandBuilder = new CoapCommandBuilder(
      coapClientPath, securityId, hubIpAddress, identity, preSharedKey,
    );
  }

  async generateDTLSIdentity() {
    const identity = uuidv1().replace(/-/g, '');
    const command = this.commandBuilder.createNewDTLSIdentity(identity);
    const result = await this.constructor.makeRequest(command, true);
    const preSharedKey = result['9091'];

    console.log('Generated identity: ', identity);
    console.log('Pre shared key: ', preSharedKey);
    console.log('----------------------------');
    console.log('Response', result);
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
              const split = stdOut.split('\n');
              resolve(JSON.parse(split[3] || split[0]));
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
