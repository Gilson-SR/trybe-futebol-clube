import { Router, Request, Response } from 'express';
import MatchController from '../controllers/MatchController';
import tokenValidation from '../middlewares/tokenValidation';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get('/', (req: Request, res: Response) => matchController.getAll(req, res));
matchRouter.patch('/:id/finish', tokenValidation, (req: Request, res: Response) =>
  matchController.finished(req, res));
matchRouter.patch('/:id', tokenValidation, (req: Request, res: Response) =>
  matchController.updateMatches(req, res));

export default matchRouter;
