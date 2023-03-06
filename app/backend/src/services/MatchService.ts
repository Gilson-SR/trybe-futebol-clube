import { ModelStatic } from 'sequelize';
import Matches from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

export default class MatchService {
  model: ModelStatic<Matches> = Matches;

  async getAll(inProgress: unknown): Promise<Matches[]> {
    const matches = await this.model.findAll(
      { include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      },
    );
    if (inProgress === 'true') {
      return matches.filter((match) => match.inProgress === true);
    }
    if (inProgress === 'false') {
      return matches.filter((match) => match.inProgress === false);
    }
    return matches;
  }

  async finished(id: number): Promise<void> {
    await this.model.findByPk(id);
    await this.model.update({ inProgress: false }, { where: { id } });
  }
}
