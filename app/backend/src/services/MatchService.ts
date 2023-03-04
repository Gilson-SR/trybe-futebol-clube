import { ModelStatic } from 'sequelize';
import Matches from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

export default class MatchesService {
  model: ModelStatic<Matches> = Matches;

  async getAll(): Promise<Matches[]> {
    const matches = await this.model.findAll(
      { include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      },
    );
    return matches;
  }
}
