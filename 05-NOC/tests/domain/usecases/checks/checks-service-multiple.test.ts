import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { CheckServiceMultiple } from '../../../../src/domain/usecases/checks/checks-service-multiple';
describe('checks-service-multiple.test.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call success callback when fetch return true', async () => {
    const mockRepository = {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    };

    const mockRepository2 = {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    };

    const mockRepository3 = {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    };

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckServiceMultiple(
      [mockRepository, mockRepository2, mockRepository3],
      successCallback,
      errorCallback
    );

    const wasOk = await checkService.execute('https://wwww.google.com');

    expect(wasOk).toBe(true);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test('should call error callback when fetch return true', async () => {
    const mockRepository = {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    };

    const mockRepository2 = {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    };

    const mockRepository3 = {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    };

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckServiceMultiple(
      [mockRepository, mockRepository2, mockRepository3],
      successCallback,
      errorCallback
    );

    const wasOk = await checkService.execute('https://wwww.goooooogle.com');

    expect(wasOk).toBe(false);
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});