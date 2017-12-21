import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { navigationEpic } from './navigation';
import { applicationsEpics } from './applications';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

const rootEpic = combineEpics(
  applicationsEpics,
  navigationEpic
);
const epicMiddleware = createEpicMiddleware(rootEpic);

export const history = createHistory();

export const rootMiddleware = composeWithDevTools(
  applyMiddleware(
    routerMiddleware(history),
    epicMiddleware
  )
);