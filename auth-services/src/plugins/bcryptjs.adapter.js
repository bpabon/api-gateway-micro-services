import pkg from 'bcryptjs';
const { compareSync, hashSync } = pkg;

export class BcryptAdapter {

  static hash( password ) {
    return hashSync( password);
  }

  static compare( password, hashed ) {
    return compareSync( password, hashed );
  }
}