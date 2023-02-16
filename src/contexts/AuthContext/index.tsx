import React, { createContext, useContext, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import toastMsg, { ToastType } from '../../utils/toasts/toastMsg';
import setTokenStorage from '../../utils/tokens/setTokenStorage';
import HTTPClient, { setAxiosAuth } from '../../services/HTTPClient';
import { UsersService } from '../../services/server/users/user.service';
import { IUser } from '../../interfaces/IUsers';

interface AuthContextData {
  logged: boolean;
  user: IUser;
  Login(loginData: { email: string; password: string }): Promise<boolean>;
  Logout(): void;
  updateUserName(newName: string): void;
}

const emptyUser = {
  _id: '',
  name: '',
  lastName: '',
  email: '',
  subscriptionsId: '',
  supportsId: '',
  casterId: '',
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}): React.ReactElement => {
  const [user, setUser] = useState<IUser>(emptyUser);
  const [logged, setLogged] = useState<boolean>(false);

  const Login = async (loginData: { email: string; password: string }): Promise<boolean> => {
    try {
      const loginResp = await UsersService.login(loginData);

      if (typeof loginResp === 'boolean') {
        alert('Invalid login');
        return false;
      }

      const { authorization, data } = loginResp;
      localStorage.clear();

      HTTPClient.api.defaults.headers.common.authorization = authorization;

      setUser(data);
      setLogged(true);

      setTokenStorage('authorization', authorization);
      localStorage.setItem(
        'USER',
        JSON.stringify({
          _id: data._id,
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          subscriptionsId: data.subscriptionsId,
          supportsId: data.supportsId,
          casterId: data.casterId,
        })
      );

      return true;
    } catch (error) {
      return false;
    }
  };

  const Logout = (): void => {
    localStorage.clear();
    setUser(emptyUser);
    setLogged(false);
  };

  const updateUserName = (newName: string): void => {
    setUser({ ...user, name: newName });
  };

  useEffect(() => {
    let isCleaning = false;
    if (!isCleaning) {
      //!Do something
    }
    return () => {
      isCleaning = true;
    };
  });

  useEffect(() => {
    let isCleaning = false;
    if (!isCleaning) {
      const localToken = localStorage.getItem('authorization');
      const localUser = localStorage.getItem('USER');

      setAxiosAuth();

      if (localToken && localUser) {
        setUser(JSON.parse(localUser));
        setLogged(true);
      }
    }
    return () => {
      isCleaning = true;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ logged, user, Login, Logout, updateUserName }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
