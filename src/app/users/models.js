// @flow
import { Record } from '../models';

export interface User extends Record {
  login: string;
  password?: string;
  createdAt: Date;
}