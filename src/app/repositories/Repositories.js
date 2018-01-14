// @flow
import React from 'react';
import { Route, Switch } from 'react-router';
import { REPOSITORIES_PATH, CREATE_REPOSITORY_PATH } from './constants';
import { RepositoryList, CreateRepository, RepositoryDetails } from './containers';

export function Repositories() {
  return (
    <Switch>
      <Route exact path={REPOSITORIES_PATH} component={RepositoryList} />
      <Route exact path={CREATE_REPOSITORY_PATH} component={CreateRepository} />
      <Route path={REPOSITORIES_PATH + '/:repositoryId'} component={RepositoryDetails} />
    </Switch>
  );
}