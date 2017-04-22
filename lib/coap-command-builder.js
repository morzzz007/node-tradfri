const isUndefined = require('lodash/isundefined');

class CoapCommandBuilder {
  constructor(coapClientPath, securityId, hubIpAddress) {
    this.coapClientPath = coapClientPath;
    this.securityId = securityId;
    this.ip = hubIpAddress;
  }

  get(type = 'device', id) {
    const endpoint = type === 'device' ? 15001 : 15004;
    let command = `${this.coapClientPath} -m get -u "Client_identity" -k "${this.securityId}" "coaps://${this.ip}:5684/${endpoint}"`;

    if (id) {
      command += `/${id}`;
    }


    return command;
  }

  put(type = 'device', id, operation) {
    const endpoint = type === 'device' ? 15001 : 15004;

    const modifier = {};
    if (!isUndefined(operation.state)) {
      if (operation.state === 'on' || operation.state === 1 || operation.state === true) {
        modifier[5850] = 1;
      } else {
        modifier[5850] = 0;
      }
    }

    if (!isUndefined(operation.color)) {
      modifier[5706] = operation.color;
    }

    if (!isUndefined(operation.brightness)) {
      modifier[5851] = operation.brightness;
    }

    const e = `'{"3311":[${JSON.stringify(modifier)}]}'`;

    console.log(e);

    const command = `${this.coapClientPath} -m put -u "Client_identity" -k "${this.securityId}" -e ${e} "coaps://${this.ip}:5684/${endpoint}/${id}"`;

    return command;
  }

  static create(coapClientPath, securityId, hubIpAddress) {
    return new CoapCommandBuilder(coapClientPath, securityId, hubIpAddress);
  }
}

module.exports = CoapCommandBuilder;
