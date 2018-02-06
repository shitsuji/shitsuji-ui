import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';
import { App } from './app/App';
import { store } from './app/store';
import { history } from './app/middlewares';
import './index.css';
import 'noty/lib/noty.css';
import 'noty/lib/themes/metroui.css';

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
),document.getElementById('root'));
registerServiceWorker();
