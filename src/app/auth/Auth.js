// @flow
import React from 'react';
import { Route, Switch } from 'react-router';
import { Login } from './containers';
import { AUTH_PATH } from './constants';

export function Auth() {
  return (
    <Switch>
      <Route exact path={AUTH_PATH} component={Login} />
    </Switch>
  );
}