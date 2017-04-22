class CoapCommandBuilder {
  constructor(coapClientPath, securityId, hubIpAddress) {
    this.coapClientPath = coapClientPath;
    this.securityId = securityId;
    this.ip = hubIpAddress;
  }

  get(deviceId) {
    let command = `${this.coapClientPath} -m get -u "Client_identity" -k "${this.securityId}" "coaps://${this.ip}:5684/15001"`;

    if (deviceId) {
      command += `/${deviceId}`;
    }


    return command;
  }

  static create(coapClientPath, securityId, hubIpAddress) {
    return new CoapCommandBuilder(coapClientPath, securityId, hubIpAddress);
  }
}

module.exports = CoapCommandBuilder;
