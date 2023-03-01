import { Router, Request, Response } from 'express';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
import loginValidation from '../middlewares/loginValidation';

const userRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRouter.post(
  '/',
  loginValidation,
  (req: Request, res: Response) => userController.login(req, res),
);
export default userRouter;
