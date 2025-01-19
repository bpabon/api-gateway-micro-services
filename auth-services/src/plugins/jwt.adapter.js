import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

const JWT_SECRET = config.jwtSecret;

export class JwtAdapter {
  // Create a new JWT token
   generateToken( 
    payload, 
    duration = '1h' ) {
    return new Promise( ( resolve ) => {
      jwt.sign( payload, JWT_SECRET, { expiresIn: duration }, (err, token) => {
        if ( err ) return resolve(null);
        resolve(token);
      });
    } );
  }
  // Validate the token 
  validateToken( token ) {
    return new Promise( (resolve) => {
      jwt.verify( token, JWT_SECRET, (err, decoded) => {
        if ( err ) return resolve(null);
        resolve(decoded);
      });
    });
  }
}