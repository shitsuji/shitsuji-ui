// @flow
import React, { Component } from 'react';
import { store } from './store';
import { Route, Redirect, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { Applications } from './applications';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './middlewares';

export class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/applications" component={Applications} />

            <Redirect to="/applications" />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}
