import { CreateTable } from '../../src/domain/usecases/create-table.usecase';
import { SaveFile } from '../../src/domain/usecases/save-file.usecase';
import { ServerApp } from '../../src/presentation/server-app';

describe("Server App", () => {
  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    destination: 'test-destination',
    name: 'test-filename',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should create server app instace", () => {
    const serverApp = new ServerApp();

    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe('function')
  });

  test('should run ServerApp with options', () => {
    const logSpy = jest.spyOn(console, 'log');
    const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
    const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

    ServerApp.run(options);

    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith('Server Running...');
    expect(logSpy).toHaveBeenCalledWith('File created');

    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({ base: options.base, limit: options.limit });

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      destination: options.destination,
      fileName: options.name,
    });
  });

  test('Should run with custom values mocked', () => {
    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    const createMock = jest.fn().mockReturnValue('1 X 2 = 2');
    const saveFileMock = jest.fn().mockReturnValue(true);

    console.log = logMock;
    console.error = logErrorMock;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith('Server running...');
    expect(createMock).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: '1 X 2 = 2',
      destination: options.destination,
      name: options.name,
    });
  });
});