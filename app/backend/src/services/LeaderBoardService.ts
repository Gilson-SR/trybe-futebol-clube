import Matches from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
import { getTeamsHome } from '../utils/leaderBoard';

export default class LeaderBoardService {
  static async getLeaderBoard() {
    const teams = await Team.findAll();

    const homeTeams:Array<unknown> = await teams.map(async (team) => {
      const homeMatches = await Matches.findAll(
        { where: { homeTeamId: team.id, inProgress: false } },
      );

      const statisticsHome = await homeMatches.map((match) => (
        getTeamsHome(team.teamName, [match])));

      const statisticsTeams = statisticsHome[homeMatches.length - 1];
      return { ...statisticsTeams };
    });

    const TeamsResults = await Promise.all(homeTeams);
    return TeamsResults;
  }
}
