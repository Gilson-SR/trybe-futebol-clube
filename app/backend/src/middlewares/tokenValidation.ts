import { Request, Response, NextFunction } from 'express';
import Jwt from '../utils/Jwt';

export default function tokenValidation(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    const tokenAuthorization = Jwt.verifyToken(authorization);
    res.locals.token = tokenAuthorization;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
}
