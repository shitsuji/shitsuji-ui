import { combineEpics } from 'redux-observable';
import { loadProjectsEpic, createProjectEpic, deleteProjectEpic, navigateToProjectsOnSuccessEpic } from './ProjectsEpics';
import { loadProjectDetailsEpic } from './ProjectDetailsEpics';
import { editProjectEpic, navigateToProjectsOnEditEpic } from './EditProjectEpics';

export const projectsEpics = combineEpics(
  loadProjectsEpic,
  createProjectEpic,
  deleteProjectEpic,
  navigateToProjectsOnSuccessEpic,
  loadProjectDetailsEpic,
  editProjectEpic,
  navigateToProjectsOnEditEpic
);