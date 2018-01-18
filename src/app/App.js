// @flow
import React from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router';
import { Applications, APPLICATIONS_PATH } from './applications';
import { Projects, PROJECTS_PATH } from './projects';
import { Repositories, REPOSITORIES_PATH } from './repositories';
import { Layout } from './layout';
import { Auth, tokenRequest, AUTH_PATH } from './auth';
import { connect } from 'react-redux';
import { RootState } from './models';
import { User } from './users';
import { Dispatch } from 'redux';
import { Loader } from 'semantic-ui-react';

function mapStateToProps({ auth }: RootState) {
  return auth;
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    loginWithToken(token: string) {
      dispatch(tokenRequest({ token }));
    }
  };
}

export interface AppProps {
  token: string;
  user: User;
  pending: boolean;
  loginWithToken: (token: string) => void;
}

export const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(class extends React.Component<AppProps> {
  componentDidMount() {
    if (!this.props.token) {
      return;
    }

    this.props.loginWithToken(this.props.token);
  }

  render() {
    const { user, token } = this.props;

    if (token && !user) {
      return <Loader active/>;
    }

    if (!user) {
      return (
        <Switch>
          <Route path={AUTH_PATH} component={Auth} />

          <Redirect to={AUTH_PATH} />
        </Switch>
      );
    }
  
    return (
      <Layout>
        <Switch>
          <Route path={APPLICATIONS_PATH} component={Applications} />
  
          <Route path={PROJECTS_PATH} component={Projects} />
  
          <Route path={REPOSITORIES_PATH} component={Repositories} />
  
          <Redirect to={APPLICATIONS_PATH} />
        </Switch>
      </Layout>
    );
  }
}));