import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { navigationEpic } from './navigation';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

const rootEpic = combineEpics(navigationEpic);
const epicMiddleware = createEpicMiddleware(rootEpic);

export const history = createHistory();

export const rootMiddleware = composeWithDevTools(
  applyMiddleware(
    routerMiddleware(history),
    epicMiddleware
  )
);