const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];

  const { yarg } = await import('../../../src/config/plugins/yargs.plugin');

  return yarg
}

describe('Test args.plugin.ts', () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  test('Should return default values', async () => {
    const yarg = await runCommand(['-b', '5']);

    expect(yarg).toEqual(expect.objectContaining({
      b: 5,
      l: 10,
      s: false,
      n: 'multiplication-table',
      d: 'outputs',
    }));
  });

  test('Should return configuration with custom values', async () => {
    const yarg = await runCommand(['-b', '8', '-l', '15', '-s', 'true', '-n', 'hello']);

    expect(yarg).toEqual(expect.objectContaining({
      b: 8,
      l: 15,
      s: true,
      n: 'hello',
      d: 'outputs',
    }));
  });
})
