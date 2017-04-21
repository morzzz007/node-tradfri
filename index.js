const key = 'xzy';
const url = '0.0.0.0';

const exec = require('child_process').exec;

const coapCall = () => new Promise((resolve) => {
  exec(`./coap-client -m get -u "Client_identity" -k "${key}" "coaps://${url}:5684/15001"`, (err, stdOut) => {
    resolve(JSON.parse(stdOut.split('\n')[3]));
  });
});

const start = async () => {
  const result = await coapCall();
  console.log('start', result);
};

start().then((response) => {
  console.log(response, 'end');
});
