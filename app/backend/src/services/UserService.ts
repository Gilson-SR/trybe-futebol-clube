import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import User from '../database/models/UserModel';
import ILogin from '../interfaces/ILogin';
import IToken from '../interfaces/IToken';
import Jwt from '../utils/Jwt';

export default class UserService {
  protected model : ModelStatic<User> = User;

  async login({ email, password }: ILogin): Promise<IToken | undefined> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return undefined;

    const pwd = bcrypt.compareSync(password, user.password);
    if (!pwd) return undefined;

    const token = Jwt.buildToken(email);
    return { token };
  }
}
