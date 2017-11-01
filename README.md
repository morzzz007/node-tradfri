
# Node Tradfri API ![img](http://i.imgur.com/Qicn5wu.jpg) [![Build Status](https://travis-ci.org/morzzz007/node-tradfri.svg?branch=master)](https://travis-ci.org/morzzz007/node-tradfri) [![npm version](https://badge.fury.io/js/node-tradfri.svg)](https://badge.fury.io/js/node-tradfri) [![npm](https://img.shields.io/npm/dm/node-tradfri.svg)]()
Node API to control **IKEA Tradfri (Trådfri)** Lights.
Currently supports Node versions **7.6+** only!


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

  await tradfri.connect();

  const devices = await tradfri.getDevices();

  // or

  await tradfri.setDeviceState(65537, {
    state: 'on',
    color: 'ffffff',
    brightness: 255
  });
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

## Public API List
|Devices|Groups|
|---|---|
|getDeviceIds()|getGroupIds()|
|getDevices()|getGroups()|
|turnOnDevice()|turnOnGroup()|
|turnOffDevice()|turnOffGroup()|
|toggleDevice()|toggleGroup()|
|setDeviceState()|setGroupState()|

## Methods for working with indivudial devices/bulbs (for groups [see this section](#methods-for-working-with-groups))

### getDeviceIds()
Returns device id's.

Response:
```javascript
  [65536, 65537, 65538]
```

### getDevices()
Returns an array with every device connected to the hub.

Example:
```javascript
[ { id: 65540,
    name: 'Ceiling 2',
    type: 'TRADFRI bulb E14 WS opal 400lm',
    on: true,
    color: 'efd275',
    brightness: 254 },
  { id: 65539,
    name: 'Ceiling 1',
    type: 'TRADFRI bulb E14 WS opal 400lm',
    on: true,
    color: 'efd275',
    brightness: 254 } ]
```

### turnOnDevice(`<deviceId>`)
|Parameters|type|values|
|---|---|---|
|`deviceId`|required|int/string|

### turnOffDevice(`<deviceId>`)
|Parameters|type|values|
|---|---|---|
|`deviceId`|required|int/string|


### toggleDevice(`<deviceId>`, `<state>`)
|Parameters|type|values|
|---|---|---|
|`deviceId`|required|int/string|
|`state`|optional|boolean|

### setDeviceState(`<deviceId>`, `<newState>`)

#### Examples
Turn device on:
```javascript
await tradfri.setDeviceState(65537, { state: 'on' });
```

Combine settings, turn on and set brightness:
```javascript
await tradfri.setDeviceState(65537, { state: 'on', brightness: 255 });
```

#### Usage

|Parameters|type|values|
|---|---|---|
|`deviceId`|required|int/string|
|`newState`|required|object|

In newState you can combine the following values:

|Parameters|values|action|
|---|---|---|
|`state`|boolean/string ('on', 'off')|Toggle light on/off
|`color`|string (hex color value, ex: 'efd275')|Sets color
|`brightness`|number/string (0-255)|Sets brightness

## Methods for working with groups

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

### turnOnGroup(`<groupId>`)
|Parameters|type|values|
|---|---|---|
|`groupId`|required|int/string|

### turnOffGroup(`<groupId>`)
|Parameters|type|values|
|---|---|---|
|`groupId`|required|int/string|


### toggleGroup(`<groupId>`, `<state>`)
|Parameters|type|values|
|---|---|---|
|`groupId`|required|int/string|
|`state`|optional|boolean|

### setGroupState(`<groupId>`, `<newState>`)

#### Examples
Turn group on:
```javascript
await tradfri.setGroupState(150429, { state: 'on' });
```

Combine settings, turn on and set brightness:
```javascript
await tradfri.setGroupState(150429, { state: 'on', brightness: 255 });
```

#### Usage

|Parameters|type|values|
|---|---|---|
|`groupId`|required|int/string|
|`newState`|required|object|

In newState you can combine the following values:

|Parameters|values|action|
|---|---|---|
|`state`|boolean/string ('on', 'off')|Toggle light on/off
|`color`|string (hex color value, ex: 'efd275')|Sets color
|`brightness`|number/string (0-255)|Sets brightness


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
