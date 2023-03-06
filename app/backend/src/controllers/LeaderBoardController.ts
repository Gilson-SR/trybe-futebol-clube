import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  static async getLeaderBoard(req: Request, res: Response) {
    const LeaderBoard = await LeaderBoardService.getLeaderBoard();
    res.status(200).json(LeaderBoard);
  }
}
