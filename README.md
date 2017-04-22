# Node Tradfri API
Node API to control **IKEA Tradfri** Lights.

## Installation

`npm install node-tradfri --save`

## CoAP

This library uses [libcoap](https://github.com/obgm/libcoap) with tinydtls to send CoAP requests.
Prebuilt OsX client is included or you can build your own and set the `coapClientPath` config setting to point to your library.
For more information on building a CoAP client [see this section.](#how-to-build-coap-client)

## Usage
```javascript
  const tradfri = require('node-tradfri').create({
    coapClientPath: './lib/coap-client', // use embedded coap-client
    securityId: '<security_id>',
    hubIpAddress: '<hub_ip_address>'
  });

  const devices = await tradfri.getDevices();
```

# API
## getDevices() - async/promise
Returns an array with every device connected to the hub.

Example:
```
[ { id: 65536, name: 'TRADFRI remote control', on: false },
  { id: 65537, name: 'TRADFRI bulb E27 WS opal 980lm', on: true },
  { id: 65538, name: 'TRADFRI bulb E27 WS opal 980lm', on: true } ]
```

# How to build CoAP client
## OsX prerequisites
```shell
brew install libtool
brew install automake
brew install autoconf
```

### Build
```shell
git clone https://github.com/obgm/libcoap.git
cd libcoap
git checkout origin/dtls
git checkout -b dtls
git submodule update --init ext/tinydtls
cd ext/tinydtls
autoreconf
./configure
cd ../../
./autogen.sh
./configure --disable-shared --disable-documentation
make
```

Now you can find the coap-client in the `/examples` directory
