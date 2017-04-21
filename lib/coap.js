const exec = require('child_process').exec;

const coapCall = (key, url, id) => new Promise((resolve, reject) => {
  let command = `./lib/coap-client -m get -u "Client_identity" -k "${key}" "coaps://${url}:5684/15001"`;

  if (id) {
    command += `/${id}`;
  }

  exec(command, (err, stdOut) => {
    if (stdOut) {
      resolve(JSON.parse(stdOut.split('\n')[3]));
    } else {
      reject('Failed to connect!');
    }
  });
});

module.exports = coapCall;
