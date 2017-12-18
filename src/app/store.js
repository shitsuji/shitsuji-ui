import { createStore } from 'redux';
import { rootReducer } from './reducers';
import { rootMiddleware } from './middlewares';

export const store = createStore(rootReducer, rootMiddleware);