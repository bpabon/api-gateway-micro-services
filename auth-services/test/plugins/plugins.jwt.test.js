import jwt from 'jsonwebtoken';
import { JwtAdapter } from '../../src/plugins/jwt.adapter.js';
import { config } from '../../src/config/config.js';
import { jest } from '@jest/globals';

describe('JwtAdapter', () => {
  const JWT_SECRET = config.jwtSecret;
  let jwtAdapter;

  beforeEach(() => {
    jwtAdapter = new JwtAdapter();
  });

  describe('generateToken', () => {
    it('should generate a token successfully', async () => {
      const payload = { userId: 123 };
      const duration = '2h';
      const mockToken = 'mockedToken';

      // Espiar la función jwt.sign
      const signSpy = jest.spyOn(jwt, 'sign').mockImplementation((payload, secret, options, callback) => {
        callback(null, mockToken);
      });

      const token = await jwtAdapter.generateToken(payload, duration);
      expect(token).toBe(mockToken);
      expect(signSpy).toHaveBeenCalledWith(payload, JWT_SECRET, { expiresIn: duration }, expect.any(Function));

      // Restaurar la implementación original después de la prueba
      signSpy.mockRestore();
    });

    it('should return null when there is an error generating the token', async () => {
      const payload = { userId: 123 };
      const duration = '1h';

      // Espiar la función jwt.sign para simular un error
      const signSpy = jest.spyOn(jwt, 'sign').mockImplementation((payload, secret, options, callback) => {
        callback(new Error('Error'), null);
      });

      const token = await jwtAdapter.generateToken(payload, duration);
      expect(token).toBeNull();
      expect(signSpy).toHaveBeenCalledWith(payload, JWT_SECRET, { expiresIn: duration }, expect.any(Function));

      // Restaurar la implementación original después de la prueba
      signSpy.mockRestore();
    });
  });

  describe('validateToken', () => {
    it('should validate and decode a token successfully', async () => {
      const decoded = { userId: 123 };

      // Espiar la función jwt.verify
      const verifySpy = jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
        callback(null, decoded);
      });

      const result = await jwtAdapter.validateToken('mockedToken');
      expect(result).toEqual(decoded);
      expect(verifySpy).toHaveBeenCalledWith('mockedToken', JWT_SECRET, expect.any(Function));

      // Restaurar la implementación original después de la prueba
      verifySpy.mockRestore();
    });

    it('should return null when there is an error validating the token', async () => {
      // Espiar la función jwt.verify para simular un error
      const verifySpy = jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
        callback(new Error('Invalid token'), null);
      });

      const result = await jwtAdapter.validateToken('invalidToken');
      expect(result).toBeNull();
      expect(verifySpy).toHaveBeenCalledWith('invalidToken', JWT_SECRET, expect.any(Function));

      // Restaurar la implementación original después de la prueba
      verifySpy.mockRestore();
    });
  });
});
