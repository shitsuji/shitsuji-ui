// @flow
import React, { Component } from 'react';
import { store } from './store';
import { Route, Redirect, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './middlewares';
import { Applications, APPLICATIONS_PATH } from './applications';
import { Projects, PROJECTS_PATH } from './projects';
import { Repositories, REPOSITORIES_PATH } from './repositories';
import { Layout } from './layout';

export class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Layout>
            <Switch>
              <Route path={APPLICATIONS_PATH} component={Applications} />

              <Route path={PROJECTS_PATH} component={Projects} />

              <Route path={REPOSITORIES_PATH} component={Repositories} />

              <Redirect to={APPLICATIONS_PATH} />
            </Switch>
          </Layout>
        </ConnectedRouter>
      </Provider>
    );
  }
}
