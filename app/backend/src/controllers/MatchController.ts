import { Request, Response } from 'express';
import MatchesService from '../services/MatchService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

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

  async newMatch(req: Request, res: Response): Promise<Response | void> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const match = await
    this.matchesService.newMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    res.status(201).json(match);
  }
}
