// @flow
import React from 'react';
import { Route, Switch } from 'react-router';
import { USERS_PATH, CREATE_USER_PATH } from './constants';
import { UserList, UserDetails, CreateUser } from './containers';

export function Users() {
  return (
    <Switch>
      <Route exact path={USERS_PATH} component={UserList} />
      <Route exact path={CREATE_USER_PATH} component={CreateUser} />
      <Route path={USERS_PATH + '/:userId'} component={UserDetails} />
    </Switch>
  );
}