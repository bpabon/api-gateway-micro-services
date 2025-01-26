import Boom from '@hapi/boom';

// Esta clase se encargará de la creación de errores
export class BoomAdapter {
  static badRequest(message, data) {
    return Boom.badRequest(message, data);
  }
  static unauthorized(message) {
    return  Boom.unauthorized(message);
  }

  static notFound(message, data) {
    return Boom.notFound(message, data);
  }

  static internal(message, data, statusCode) {
    return  Boom.internal(message,data,statusCode);
  }
  static badImplementation(message, data) {
    return  Boom.badImplementation(message,data);
  }
  static boomify(err, options){
    return Boom.boomify(err,options);
  }
  static conflict(messageOrError = ''){
    return Boom.conflict(messageOrError);
  }
  static notImplemented(messageOrError, data){
    return Boom.notImplemented(messageOrError, data);
  }
}
