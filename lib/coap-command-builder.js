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
    let e = '';

    switch (operation) {
      case 'turn-off':
        e = `'{"3311":[{"5850":0}]}'`;
        break;
      case 'turn-on':
        e = `'{"3311":[{"5850":1}]}'`;
        break;
      default:
        throw new Error('Unknown operation');
    }

    const command = `${this.coapClientPath} -m put -u "Client_identity" -k "${this.securityId}" -e ${e} "coaps://${this.ip}:5684/${endpoint}/${id}"`;

    return command;
  }

  static create(coapClientPath, securityId, hubIpAddress) {
    return new CoapCommandBuilder(coapClientPath, securityId, hubIpAddress);
  }
}

module.exports = CoapCommandBuilder;
