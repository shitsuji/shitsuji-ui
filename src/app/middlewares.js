import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { navigationEpic } from './navigation';
import { applicationsEpics } from './applications';
import { projectsEpics } from './projects';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

export const history = createHistory();

const rootEpic = combineEpics(
  applicationsEpics,
  navigationEpic,
  projectsEpics
);

const dependencies = {
  history
};

const epicMiddleware = createEpicMiddleware(rootEpic, { dependencies });

export const rootMiddleware = composeWithDevTools(
  applyMiddleware(
    routerMiddleware(history),
    epicMiddleware
  )
);