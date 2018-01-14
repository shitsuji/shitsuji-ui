// @flow
import { ApplicationsState, ApplicationDetailsState } from './applications';
import { RouterState } from 'react-router-redux';
import { ProjectsState, ProjectDetailsState } from './projects';
import { RepositoriesState, RepositoryDetailsState } from './repositories';

export interface RootState {
  applications: ApplicationsState;
  applicationDetails: ApplicationDetailsState;
  router: RouterState;
  projects: ProjectsState;
  projectDetails: ProjectDetailsState;
  repositories: RepositoriesState;
  repositoryDetails: RepositoryDetailsState;
}

export interface Record {
  '@rid': string;
  '@class': string;
}
