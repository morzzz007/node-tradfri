# Node Tradfri API

Node API to control IKEA Tradfri Lights

# Installation

`npm install node-tradfri --save`

# Usage
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

