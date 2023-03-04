import { Request, Response } from 'express';
import MatchesService from '../services/MatchService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async getAll(req: Request, res: Response): Promise<Response | void> {
    const matches = await this.matchesService.getAll();
    res.status(200).json(matches);
  }
}
