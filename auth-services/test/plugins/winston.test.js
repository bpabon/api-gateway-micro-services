import winston from 'winston';
import LoggerAdapter from '../../src/plugins/winston.adapter.js';
import { jest } from '@jest/globals';

// Mock de winston
jest.mock('winston', () => {
  const mLogger = {
    log: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    critical: jest.fn(),
    debug: jest.fn(),
  };
  return {
    createLogger: jest.fn(() => mLogger),
    transports: {
      Console: jest.fn(),
      DailyRotateFile: jest.fn(),
      File: jest.fn(),
    },
    format: {
      combine: jest.fn(),
      timestamp: jest.fn(),
      errors: jest.fn(),
      printf: jest.fn(),
    },
  };
});

describe('LoggerAdapter', () => {
  let loggerAdapter;

  beforeEach(() => {
    loggerAdapter = LoggerAdapter;
  });

  it('should log a message with the specified level', () => {
    const level = 'info';
    const message = 'Test message';
    
    // Espiar la función log
    const logSpy = jest.spyOn(loggerAdapter.logger, 'log');
    loggerAdapter.log(level, message);
    expect(logSpy).toHaveBeenCalledWith(level, message);

    // Restaurar la implementación original después de la prueba
    logSpy.mockRestore();
  });

  it('should log an info message', () => {
    const message = 'Info message';

    // Espiar la función info
    const infoSpy = jest.spyOn(loggerAdapter.logger, 'info');
    loggerAdapter.info(message);
    expect(infoSpy).toHaveBeenCalledWith(message);

    // Restaurar la implementación original después de la prueba
    infoSpy.mockRestore();
  });

  it('should log a warn message', () => {
    const message = 'Warn message';

    // Espiar la función warn
    const warnSpy = jest.spyOn(loggerAdapter.logger, 'warn');
    loggerAdapter.warn(message);
    expect(warnSpy).toHaveBeenCalledWith(message);

    // Restaurar la implementación original después de la prueba
    warnSpy.mockRestore();
  });

  it('should log an error message', () => {
    const message = 'Error message';

    // Espiar la función error
    const errorSpy = jest.spyOn(loggerAdapter.logger, 'error');
    loggerAdapter.error(message);
    expect(errorSpy).toHaveBeenCalledWith(message);

    // Restaurar la implementación original después de la prueba
    errorSpy.mockRestore();
  });

  it('should log a critical message', () => {
    const message = 'Critical message';

    // Espiar la función critical
    const criticalSpy = jest.spyOn(loggerAdapter.logger, 'critical');
    loggerAdapter.critical(message);
    expect(criticalSpy).toHaveBeenCalledWith(message);

    // Restaurar la implementación original después de la prueba
    criticalSpy.mockRestore();
  });

  it('should log a debug message', () => {
    const message = 'Debug message';

    // Espiar la función debug
    const debugSpy = jest.spyOn(loggerAdapter.logger, 'debug');
    loggerAdapter.debug(message);
    expect(debugSpy).toHaveBeenCalledWith(message);

    // Restaurar la implementación original después de la prueba
    debugSpy.mockRestore();
  });
});
