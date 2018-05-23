const isUndefined = require('lodash/isUndefined');

class CoapCommandBuilder {
  constructor(coapClientPath, securityId, hubIpAddress, identity, preSharedKey) {
    this.coapClientPath = coapClientPath;
    this.securityId = securityId;
    this.ip = hubIpAddress;
    this.identity = identity;
    this.preSharedKey = preSharedKey || '';
  }

  setPreSharedKey(preSharedKey) {
    this.preSharedKey = preSharedKey;
  }

  createNewDTLSIdentity(identity) {
    return `${this.coapClientPath} -m post -u "Client_identity" -k "${this.securityId}" -e '{"9090":"${identity}"}' "coaps://${this.ip}:5684/15011/9063"`;
  }

  get(type = 'device', id) {
    const endpoint = type === 'device' ? 15001 : 15004;
    let command = `${this.coapClientPath} -m get -u "${this.identity}" -k "${this.preSharedKey}" "coaps://${this.ip}:5684/${endpoint}`;

    if (id) {
      command += `/${id}"`;
    } else {
      command += '"';
    }

    return command;
  }

  put(type = 'device', id, operation = {}) {
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

    if (!isUndefined(operation.colorX)) {
      modifier[5709] = operation.colorX;
    }

    if (!isUndefined(operation.colorY)) {
      modifier[5710] = operation.colorY;
    }

    if (!isUndefined(operation.brightness)) {
      modifier[5851] = operation.brightness;
    }

    if (!isUndefined(operation.transitionTime)) {
      modifier[5712] = operation.transitionTime;
    }

    let e = '';
    if (type === 'device') {
      e = `'{"3311":[${JSON.stringify(modifier)}]}'`;
    } else {
      e = `'${JSON.stringify(modifier)}'`;
    }

    const command = `${this.coapClientPath} -m put -u "${this.identity}" -k "${this.preSharedKey}" -e ${e} "coaps://${this.ip}:5684/${endpoint}/${id}"`;

    return command;
  }
}

module.exports = CoapCommandBuilder;
