import { Router, Request, Response } from 'express';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
import loginValidation from '../middlewares/loginValidation';
import tokenValidation from '../middlewares/tokenValidation';

const userRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRouter.post(
  '/',
  loginValidation,
  (req: Request, res: Response) => userController.login(req, res),

  userRouter.get(
    '/role',
    tokenValidation,
    (req: Request, res: Response) => userController.loginRole(req, res),
  ),
);
export default userRouter;
