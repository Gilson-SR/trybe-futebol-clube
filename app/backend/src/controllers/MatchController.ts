import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchesService = new MatchService()) {}

  public async getAll(req: Request, res: Response): Promise<Response | void> {
    const { inProgress } = req.query;
    const matches = await this.matchesService.getAll(inProgress);
    res.status(200).json(matches);
  }

  async finished(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    await this.matchesService.finished(Number(id));
    res.status(200).json({ message: 'Finished' });
  }

  async updateMatches(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchesService.updateMatches(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(200).json({ message: 'Placar Alterado' });
  }
}
