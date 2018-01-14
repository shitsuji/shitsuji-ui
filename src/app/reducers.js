// @flow
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { applicationsReducer, applicationDetailsReducer } from './applications';
import { projectsReducer, projectDetailsReducer } from './projects';
import { repositoriesReducer, repositoryDetailsReducer } from './repositories';

export const rootReducer = combineReducers({
  applications: applicationsReducer,
  applicationDetails: applicationDetailsReducer,
  router: routerReducer,
  projects: projectsReducer,
  projectDetails: projectDetailsReducer,
  repositories: repositoriesReducer,
  repositoryDetails: repositoryDetailsReducer
});