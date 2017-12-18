// @flow
import React, { Component } from 'react';
import { store } from './store';
import { Route, Redirect, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './middlewares';
import { Applications } from './applications';
import { Projects } from './projects';
import { Repositories } from './repositories';


export class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/applications" component={Applications} />

            <Route path="/projects" component={Projects} />

            <Route path="/repositories" component={Repositories} />

            <Redirect to="/applications" />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}
