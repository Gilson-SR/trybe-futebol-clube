import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/TeamService';

export default async function validateMatches(req: Request, res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;

  const teamService = new TeamService();

  if (homeTeamId === awayTeamId) {
    return res.status(422).json(
      { message: 'It is not possible to create a match with two equal teams' },
    );
  }
  const homeID = await teamService.getById(homeTeamId);
  const awayID = await teamService.getById(awayTeamId);
  if (!homeID || !awayID) {
    return res.status(404).json(
      { message: 'There is no team with such id!' },
    );
  }
  next();
}
