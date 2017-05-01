const CommandBuilder = require('./');

let commandBuilder = {};

describe('get should return a command', () => {
  beforeEach(() => {
    commandBuilder = new CommandBuilder('./test-path/coap-client', 1234, '192.168.0.1');
  });

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
