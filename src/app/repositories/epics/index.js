import { combineEpics } from 'redux-observable';
import {
  loadRepositoriesEpic,
  createRepositoryEpic,
  deleteRepositoryEpic,
  navigateToRepositoriesOnSuccessEpic,
  createRepositoryToastEpic,
  deleteRepositoryToastEpic
} from './RepositoriesEpics';
import {
  loadRepositoryDetailsEpic,
  initializeRepositoryEpic,
  regenerateRepositoryEpic,
  initializeRepositoryToastEpic,
  regenerateRepositoryToastEpic
} from './RepositoryDetailsEpics';
import {
  editRepositoryEpic,
  navigateToRepositoriesOnEditEpic,
  editRepositoryToastEpic
} from './EditRepositoryEpics';

export const repositoriesEpics = combineEpics(
  loadRepositoriesEpic,
  createRepositoryEpic,
  deleteRepositoryEpic,
  navigateToRepositoriesOnSuccessEpic,
  loadRepositoryDetailsEpic,
  editRepositoryEpic,
  navigateToRepositoriesOnEditEpic,
  initializeRepositoryEpic,
  regenerateRepositoryEpic,
  editRepositoryToastEpic,
  initializeRepositoryToastEpic,
  regenerateRepositoryToastEpic,
  createRepositoryToastEpic,
  deleteRepositoryToastEpic
);