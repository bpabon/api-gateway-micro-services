import Boom from '@hapi/boom';
import { BoomAdapter } from '../../src/plugins/hapi-boom.adapter.js';

describe('BoomAdapter', () => {
  it('should return a bad request error', () => {
    const message = 'Bad Request';
    const data = { key: 'value' };
    const error = BoomAdapter.badRequest(message, data);

    expect(error).toBeInstanceOf(Boom.Boom);
    expect(error.output.statusCode).toBe(400);
    expect(error.message).toBe(message);
    expect(error.data).toEqual(data);
  });

  it('should return an unauthorized error', () => {
    const message = 'Unauthorized';
    const error = BoomAdapter.unauthorized(message);

    expect(error).toBeInstanceOf(Boom.Boom);
    expect(error.output.statusCode).toBe(401);
    expect(error.message).toBe(message);
  });

  it('should return a not found error', () => {
    const message = 'Not Found';
    const data = { key: 'value' };
    const error = BoomAdapter.notFound(message, data);

    expect(error).toBeInstanceOf(Boom.Boom);
    expect(error.output.statusCode).toBe(404);
    expect(error.message).toBe(message);
    expect(error.data).toEqual(data);
  });

  it('should return an internal error', () => {
    const message = 'Internal Error';
    const data = { key: 'value' };
    const statusCode = 500;
    const error = BoomAdapter.internal(message, data, statusCode);

    expect(error).toBeInstanceOf(Boom.Boom);
    expect(error.output.statusCode).toBe(500);
    expect(error.message).toBe(message);
    expect(error.data).toEqual(data);
  });

  it('should return a bad implementation error', () => {
    const message = 'Bad Implementation';
    const data = { key: 'value' };
    const error = BoomAdapter.badImplementation(message, data);

    expect(error).toBeInstanceOf(Boom.Boom);
    expect(error.output.statusCode).toBe(500);
    expect(error.message).toBe(message);
    expect(error.data).toEqual(data);
  });

  it('should boomify an error', () => {
    const err = new Error('Test Error');
    const options = { statusCode: 400 };
    const error = BoomAdapter.boomify(err, options);

    expect(error).toBeInstanceOf(Boom.Boom);
    expect(error.output.statusCode).toBe(400);
    expect(error.message).toBe('Test Error');
  });

  it('should return a conflict error', () => {
    const message = 'Conflict';
    const error = BoomAdapter.conflict(message);

    expect(error).toBeInstanceOf(Boom.Boom);
    expect(error.output.statusCode).toBe(409);
    expect(error.message).toBe(message);
  });

  it('should return a not implemented error', () => {
    const message = 'Not Implemented';
    const data = { key: 'value' };
    const error = BoomAdapter.notImplemented(message, data);

    expect(error).toBeInstanceOf(Boom.Boom);
    expect(error.output.statusCode).toBe(501);
    expect(error.message).toBe(message);
    expect(error.data).toEqual(data);
  });
});