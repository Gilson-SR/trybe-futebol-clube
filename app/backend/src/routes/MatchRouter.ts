import { Router, Request, Response } from 'express';
import validateToken from '../middlewares/tokenValidation';
import MatchesController from '../controllers/MatchController';
import validateMatches from '../middlewares/matchValidation';

const matchesController = new MatchesController();

const matchesRouter = Router();

matchesRouter.get('/', (req: Request, res: Response) => matchesController.getAll(req, res));
matchesRouter.patch('/:id/finish', validateToken, (req: Request, res: Response) =>
  matchesController.finished(req, res));
matchesRouter.patch('/:id', validateToken, (req: Request, res: Response) =>
  matchesController.updateMatches(req, res));
matchesRouter.post('/', validateToken, validateMatches, (req: Request, res: Response) =>
  matchesController.newMatch(req, res));

export default matchesRouter;
