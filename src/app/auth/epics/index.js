import { combineEpics } from 'redux-observable';
import { loginEpic, tokenEpic, setTokenEpic, removeTokenEpic } from './AuthEpics';

export const authEpics = combineEpics(
  loginEpic,
  tokenEpic,
  setTokenEpic,
  removeTokenEpic
);