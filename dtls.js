const args = process.argv.slice(2);

const start = async () => {
  const [hubIpAddress, securityId, coapClientPath] = args;
  const tradfri = require('./index').create({
    coapClientPath: coapClientPath || './lib/coap-client', // use embedded coap-client
    securityId,
    hubIpAddress,
  });
  await tradfri.generateDTLSIdentity();
};

start().then(() => {
  console.log('End.');
});
