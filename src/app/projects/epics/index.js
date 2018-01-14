import { combineEpics } from 'redux-observable';
import { loadProjectsEpic, createProjectEpic, deleteProjectEpic, navigateToProjectsOnSuccessEpic } from './ProjectsEpics';
import { loadProjectDetailsEpic } from './ProjectDetailsEpics';

export const projectsEpics = combineEpics(
  loadProjectsEpic,
  createProjectEpic,
  deleteProjectEpic,
  navigateToProjectsOnSuccessEpic,
  loadProjectDetailsEpic
);