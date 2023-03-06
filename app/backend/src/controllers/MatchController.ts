import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchesService = new MatchService()) {}

  public async getAll(req: Request, res: Response): Promise<Response | void> {
    const { inProgress } = req.query;
    const matches = await this.matchesService.getAll(inProgress);
    res.status(200).json(matches);
  }
}
