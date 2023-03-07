import { Request, Response } from 'express';
import UserService from '../services/UserService';
// import validateToken from '../middlewares/validateToken';

export default class UserController {
  private service: UserService;
  constructor(service: UserService) {
    this.service = service;
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const tokenJwt = await this.service.login({ email, password });

    if (!tokenJwt) res.status(401).json({ message: 'Invalid email or password' });
    res.status(200).json(tokenJwt);
  }

  async loginRole(req: Request, res: Response) {
    const { email } = res.locals.token;
    const result = await this.service.loginRole(email);
    if (!result) res.status(401).json({ message: 'Invalid email or password' });
    res.status(200).json({ role: result });
  }
}
