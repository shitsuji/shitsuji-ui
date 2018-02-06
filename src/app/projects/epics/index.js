import { combineEpics } from 'redux-observable';
import {
  loadProjectsEpic,
  createProjectEpic,
  deleteProjectEpic,
  navigateToProjectsOnSuccessEpic,
  deleteProjectToastEpic,
  createProjectToastEpic
} from './ProjectsEpics';
import { loadProjectDetailsEpic } from './ProjectDetailsEpics';
import { editProjectEpic, navigateToProjectsOnEditEpic, editProjectToastEpic } from './EditProjectEpics';

export const projectsEpics = combineEpics(
  loadProjectsEpic,
  createProjectEpic,
  deleteProjectEpic,
  navigateToProjectsOnSuccessEpic,
  loadProjectDetailsEpic,
  editProjectEpic,
  navigateToProjectsOnEditEpic,
  editProjectToastEpic,
  deleteProjectToastEpic,
  createProjectToastEpic
);