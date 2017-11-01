const CommandBuilder = require('./');

let commandBuilder = {};

describe('command builder', () => {
  beforeEach(() => {
    commandBuilder = new CommandBuilder('./test-path/coap-client', 1234, '192.168.0.1', 'Client_identity', 1234);
  });

  describe('get should return a command', () => {
    test('starting with the clients path', () => {
      expect(commandBuilder.get()).toMatch(/^\.\/test-path\/coap-client/);
    });

    test('with the right method', () => {
      expect(commandBuilder.get()).toMatch(/-m get/);
    });

    test('with the right -u parameter', () => {
      expect(commandBuilder.get()).toMatch(/-u "Client_identity"/);
    });

    test('with the given security id', () => {
      expect(commandBuilder.get()).toMatch(/-k "1234"/);
    });

    test('with the url with the hub ip address and the port', () => {
      expect(commandBuilder.get()).toMatch(/coaps:\/\/192.168.0.1:5684\//);
    });

    test('with 15001 in the url when querying for devices without device id', () => {
      expect(commandBuilder.get()).toMatch(/15001"$/);
      expect(commandBuilder.get('device')).toMatch(/15001"$/);
    });

    test('with 15004 in the end url when querying for groups without group id', () => {
      expect(commandBuilder.get('group')).toMatch(/15004"$/);
    });

    test('with the given device id if it is defined', () => {
      expect(commandBuilder.get('device', 999)).toMatch(/coaps:\/\/192.168.0.1:5684\/15001\/999/);
    });

    test('with the given group id if it is defined', () => {
      expect(commandBuilder.get('group', 666)).toMatch(/coaps:\/\/192.168.0.1:5684\/15004\/666/);
    });
  });

  describe('put should return a command', () => {
    test('starting with the clients path', () => {
      expect(commandBuilder.put()).toMatch(/^\.\/test-path\/coap-client/);
    });

    test('with the right method', () => {
      expect(commandBuilder.put()).toMatch(/-m put/);
    });

    test('with the right -u parameter', () => {
      expect(commandBuilder.put()).toMatch(/-u "Client_identity"/);
    });

    test('with the given security id', () => {
      expect(commandBuilder.put()).toMatch(/-k "1234"/);
    });

    test('with the url with the hub ip address and the port', () => {
      expect(commandBuilder.put()).toMatch(/coaps:\/\/192.168.0.1:5684\//);
    });

    test('with the given device id if it is defined', () => {
      expect(commandBuilder.put('device', 999)).toMatch(/coaps:\/\/192.168.0.1:5684\/15001\/999/);
    });

    test('with the given group id if it is defined', () => {
      expect(commandBuilder.put('group', 666)).toMatch(/coaps:\/\/192.168.0.1:5684\/15004\/666/);
    });

    test('with { 5850: 1 } if state: "on"/1/true given', () => {
      const commandOn = { state: 'on' };
      const command1 = { state: 1 };
      const commandTrue = { state: true };
      expect(commandBuilder.put('group', 666, commandOn)).toMatch(/-e '{"5850":1}'/);
      expect(commandBuilder.put('group', 666, command1)).toMatch(/-e '{"5850":1}'/);
      expect(commandBuilder.put('group', 666, commandTrue)).toMatch(/-e '{"5850":1}'/);
    });

    test('with { 5850: 0 } if state: "off"/0/false given', () => {
      const commandOff = { state: 'off' };
      const command0 = { state: 0 };
      const commandFalse = { state: false };
      expect(commandBuilder.put('group', 666, commandOff)).toMatch(/-e '{"5850":0}'/);
      expect(commandBuilder.put('group', 666, command0)).toMatch(/-e '{"5850":0}'/);
      expect(commandBuilder.put('group', 666, commandFalse)).toMatch(/-e '{"5850":0}'/);
    });

    test('with { 5706: xxx } if color given', () => {
      const command = { color: 'ffffff' };
      expect(commandBuilder.put('group', 666, command)).toMatch(/-e '{"5706":"ffffff"}'/);
    });

    test('with { 5851: xxx } if brightess given', () => {
      const command = { brightness: 255 };
      expect(commandBuilder.put('group', 666, command)).toMatch(/-e '{"5851":255}'/);
    });

    test('with { 5712: xxx } if transitionTime given', () => {
      const command = { transitionTime: 1000 };
      expect(commandBuilder.put('group', 666, command)).toMatch(/-e '{"5712":1000}'/);
    });

    test('with combined commands', () => {
      const command = {
        state: 'off',
        transitionTime: 1000,
      };
      expect(commandBuilder.put('group', 666, command)).toMatch(/-e '{"5712":1000,"5850":0}'/);
    });
  });
});
