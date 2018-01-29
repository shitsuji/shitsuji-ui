// @flow
import { ProjectsState, ProjectDetailsState } from './models';

export const PROJECTS_PATH = '/projects';
export const CREATE_PROJECT_PATH = `${PROJECTS_PATH}/create`;

export const PROJECTS_INITIAL_STATE: ProjectsState = {
  pending: true,
  projects: null
};

export const PROJECT_DETAILS_INITIAL_STATE: ProjectDetailsState = {
  pending: true,
  project: null,
  applications: null
};
