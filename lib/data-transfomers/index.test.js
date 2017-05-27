const { transformRawDeviceData, transformRawGroupData } = require('./');

describe('transformRawDeviceData', () => {
  test('should transform basic device data', () => {
    const testDevice = {
      9003: 1234,
      9001: 'name',
      3: {
        1: 'device type',
      },
      3311: [
        {
          5850: 1,
          5706: 'f5faf6',
          5851: 255,
        },
      ],
    };

    expect(transformRawDeviceData(testDevice)).toEqual({
      id: 1234,
      name: 'name',
      type: 'device type',
      on: true,
      color: 'f5faf6',
      brightness: 255,
    });
  });

  test('should handle device off state', () => {
    const testDevice = {
      3311: [
        {
          5850: 0,
        },
      ],
    };

    expect(transformRawDeviceData(testDevice)).toHaveProperty('on', false);
  });
});

describe('transformRawGroupData', () => {
  test('should transform basic group data', () => {
    const testGroup = {
      9003: 1234,
      9001: 'name',
      9018: {
        15002: {
          9003: [1, 2, 3],
        },
      },
      5850: 1,
    };

    expect(transformRawGroupData(testGroup)).toEqual({
      id: 1234,
      name: 'name',
      devices: [1, 2, 3],
      on: true,
    });
  });

  test('should handle device off state', () => {
    const testGroup = {
      5850: 0,
    };

    expect(transformRawGroupData(testGroup)).toHaveProperty('on', false);
  });
});
