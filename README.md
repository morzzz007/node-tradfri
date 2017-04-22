
# Node Tradfri API ![img](http://i.imgur.com/Qicn5wu.jpg)
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
## Basics
Every exposed method is asynchronous and returns a promise.

You can use async/await:
```javascript
  const deviceIds = await tradfri.getDeviceIds();
```

Or the typical promises approach:
```javascript
  tradfri.getDeviceIds().then(deviceIds => {
    // do something
  });
```

## Methods
### getDeviceIds()
Returns device id's.

Response:
```javascript
  [65536, 65537, 65538]
```

### getDevices()
Returns an array with every device connected to the hub.

Example:
```
[ { id: 65536,
    name: 'TRADFRI remote control',
    type: 'TRADFRI remote control',
    on: false },
  { id: 65537,
    name: 'TRADFRI bulb E27 WS opal 980lm',
    type: 'TRADFRI bulb E27 WS opal 980lm',
    on: false },
  { id: 65538,
    name: 'TRADFRI bulb E27 WS opal 980lm 2',
    type: 'TRADFRI bulb E27 WS opal 980lm',
    on: false } ]
```

### getGroupIds()
Returns group id's.

Response:
```javascript
  [150429]
```

### getGroups()
Returns an array of groups with the devices in it.

Response:
```javascript
[ { id: 150429,
    name: 'Kitchen',
    devices: [ [Object], [Object], [Object] ],
    on: false } ]
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
