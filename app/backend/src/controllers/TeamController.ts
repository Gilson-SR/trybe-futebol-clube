import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public async getAll(_req: Request, res: Response): Promise<Response | void> {
    const result = await this.teamService.getAll();
    res.status(200).json(result);
  }

  public async getById(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    const result = await this.teamService.getById(Number(id));
    res.status(200).json(result);
  }
}
