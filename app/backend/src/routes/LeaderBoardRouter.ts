import { Router, Request, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', (req: Request, res: Response) =>
  LeaderBoardController.getLeaderBoard(req, res));

leaderBoardRouter.get('/away', (req: Request, res: Response) =>
  LeaderBoardController.getLeaderBoardAway(req, res));

export default leaderBoardRouter;
