import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/TeamModel';

export default class TeamService {
  protected teamModel: ModelStatic<TeamModel> = TeamModel;

  async getAll(): Promise<TeamModel[]> {
    const result = await this.teamModel.findAll();
    return result;
  }
}
