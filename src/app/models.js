// @flow
import { ApplicationsState, ApplicationDetailsState } from './applications';
import { RouterState } from 'react-router-redux';
import { ProjectsState, ProjectDetailsState } from './projects';

export interface RootState {
  applications: ApplicationsState;
  applicationDetails: ApplicationDetailsState;
  router: RouterState;
  projects: ProjectsState;
  projectDetails: ProjectDetailsState;
}

export interface Record {
  '@rid': string;
  '@class': string;
}
