export interface ICreateUser {
  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface IUpdateUser {
  name: string;
  lastName: string;
  email: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  favoritesId: string | null;
  subscriptionsId: string | null;
  casterId: string | null;
  supportsId: string | null;
  created_At?: Date;
  updated_At?: Date;
}
