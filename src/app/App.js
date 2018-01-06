// @flow
import React, { Component } from 'react';
import { store } from './store';
import { Route, Redirect, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './middlewares';
import { Applications, CreateApplication, APPLICATIONS_PATH, CREATE_APPLICATION_PATH } from './applications';
import { Projects } from './projects';
import { Repositories } from './repositories';

export class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path={APPLICATIONS_PATH} component={Applications} />
            <Route exact path={CREATE_APPLICATION_PATH} component={CreateApplication} />

            <Route path="/projects" component={Projects} />

            <Route path="/repositories" component={Repositories} />

            <Redirect to={APPLICATIONS_PATH} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}
