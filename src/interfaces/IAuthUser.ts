export interface IAuthUser {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  subscriptionsId?: '';
  supportsId?: '';
  casterId?: '';
  exp: number;
}
