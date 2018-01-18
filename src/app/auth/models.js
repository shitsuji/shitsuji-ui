// @flow
import { User } from '../users';

export interface LoginCredentials {
  login: string;
  password: string;
}

export interface AuthResponse { 
  user: User;
  token: string;
}

export interface AuthState {
  pending: boolean;
}
