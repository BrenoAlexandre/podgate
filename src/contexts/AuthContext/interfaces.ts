import React from 'react';
import firebase from '../../config/firebase';

export interface IAuthContext {
  currentUser: firebase.User | null;
  login: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
}

export interface IAuthProvider {
  children: React.ReactElement;
}
