import { combineEpics } from 'redux-observable';
import {
  loadRepositoriesEpic,
  createRepositoryEpic,
  deleteRepositoryEpic,
  navigateToRepositoriesOnSuccessEpic
} from './RepositoriesEpics';
import { loadRepositoryDetailsEpic } from './RepositoryDetailsEpics';
import { editRepositoryEpic, navigateToRepositoriesOnEditEpic } from './EditRepositoryEpics';

export const repositoriesEpics = combineEpics(
  loadRepositoriesEpic,
  createRepositoryEpic,
  deleteRepositoryEpic,
  navigateToRepositoriesOnSuccessEpic,
  loadRepositoryDetailsEpic,
  editRepositoryEpic,
  navigateToRepositoriesOnEditEpic
);