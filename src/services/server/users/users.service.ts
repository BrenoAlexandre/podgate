import { Secret, verify } from 'jsonwebtoken';
import toastMsg, { ToastType } from '../../../utils/toasts/toastMsg';
import HTTPClient from '../../HTTPClient';
import { ICreateUser, ILogin, IUpdateUser, IUser } from '../../../interfaces/IUsers';

export class UsersService {
  private static v1 = '/api/v1';

  private static baseUrl = '/user';

  private static toastError = (msg: string): void => {
    toastMsg(ToastType.Error, msg);
  };

  static async create(user: ICreateUser): Promise<void> {
    return HTTPClient.api.post(`${this.v1}${this.baseUrl}`, user).then((response) => response.data);
  }

  static async update(name: IUpdateUser): Promise<void> {
    return HTTPClient.api.put(`${this.baseUrl}`, { name }).then((response) => response.data);
  }

  static async login(login: ILogin): Promise<{ authorization: string; data: IUser }> {
    const { email, password } = login;
    return HTTPClient.api.post(`${this.baseUrl}/login`, { email, password }).then((response) => {
      const { authorization } = response.headers;

      if (!authorization) {
        this.toastError('Token not received');
        throw new Error();
      }

      const data = verify(
        authorization,
        process.env.REACT_APP_TOKEN_KEY as Secret
      ) as unknown as IUser;
      return { authorization, data };
    });
  }
}
