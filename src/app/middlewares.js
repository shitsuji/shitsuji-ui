import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { navigationEpic } from './navigation';
import { applicationsEpics } from './applications';
import { projectsEpics } from './projects';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { repositoriesEpics } from './repositories';
import { authEpics } from './auth';
import * as axios from 'axios';
import { BASE_URL } from './constants';
import { usersEpics } from './users';

export const history = createHistory();
axios.defaults.baseURL = BASE_URL;

const rootEpic = combineEpics(
  applicationsEpics,
  navigationEpic,
  projectsEpics,
  repositoriesEpics,
  authEpics,
  usersEpics
);

const dependencies = {
  history,
  axios
};

const epicMiddleware = createEpicMiddleware(rootEpic, { dependencies });

export const rootMiddleware = composeWithDevTools(
  applyMiddleware(
    routerMiddleware(history),
    epicMiddleware
  )
);