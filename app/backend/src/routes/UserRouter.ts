import { Router, Request, Response } from 'express';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/loginValidation';
import validateToken from '../middlewares/tokenValidation';

const userRoutes = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRoutes.post(
  '/',
  validateLogin,
  (req: Request, res: Response) => userController.login(req, res),

  userRoutes.get(
    '/role',
    validateToken,
    (req: Request, res: Response) => userController.loginRole(req, res),
  ),
);
export default userRoutes;
