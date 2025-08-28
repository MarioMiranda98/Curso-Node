import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { CheckService } from '../../../../src/domain/usecases/checks/checks-service';

describe('checks-service.test.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call success callback when fetch return true', async () => {
    const mockRepository = {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    };
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(
      mockRepository,
      successCallback,
      errorCallback
    );

    const wasOk = await checkService.execute('https://wwww.google.com');

    expect(wasOk).toBe(true);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test('should call error callback when fetch return true', async () => {
    const mockRepository = {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    };
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(
      mockRepository,
      successCallback,
      errorCallback
    );

    const wasOk = await checkService.execute('https://wwww.goooooogle.com');

    expect(wasOk).toBe(false);
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});