import * as jwt from 'jsonwebtoken';
import process = require('process');

export default class Jwt {
  static buildToken(email :string) {
    const secret = `${process.env.JWT_SECRET}`;

    return jwt.sign({ email }, secret);
  }

  static verifyToken(token: string) {
    const secret = `${process.env.JWT_SECRET}`;
    return jwt.verify(token, secret);
  }
}
