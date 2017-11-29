const args = process.argv.slice(2);

const start = async () => {
  const [hubIpAddress, securityId, coapClientPath] = args;

  if (!hubIpAddress) {
    console.log('Please provide the ip address of the Tradfri hub as the first argument!')
    return;
  }

  if (!securityId) {
    console.log('Please provide the security code as the second argument!')
    return;
  }

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
