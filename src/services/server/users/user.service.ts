import decode from 'jwt-decode';
import HTTPClient from '../../HTTPClient';
import { ICreateUser, ILogin, IUpdateUser, IUser } from '../../../interfaces/IUsers';

export class UsersService {
  private static v1 = '/api/v1';

  private static baseUrl = '/user';

  static async create(user: ICreateUser): Promise<boolean> {
    return HTTPClient.api
      .post(`${this.v1}${this.baseUrl}`, user)
      .then((response) => (response.data ? true : false));
  }

  static async update(name: IUpdateUser): Promise<void> {
    return HTTPClient.api
      .put(`${this.v1}${this.baseUrl}`, { name })
      .then((response) => response.data);
  }

  static async login(login: ILogin): Promise<boolean | { authorization: string; data: IUser }> {
    const { email, password } = login;
    return HTTPClient.api
      .post(`${this.v1}/login`, { email, password })
      .then((response) => {
        const { authorization } = response.headers;

        if (!authorization) {
          throw new Error('No auth found');
        }
        const data = decode(authorization) as unknown as IUser;

        return { authorization, data };
      })
      .catch((e) => {
        return false;
      });
  }
}

export default UsersService;
