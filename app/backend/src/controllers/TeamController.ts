import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public async getAll(_req: Request, res: Response): Promise<Response | void> {
    const result = await this.teamService.getAll();
    res.status(200).json(result);
  }
}
