// @flow
import React from 'react';
import { Route, Switch } from 'react-router';
import { APPLICATIONS_PATH, CREATE_APPLICATION_PATH } from './constants';
import { ApplicationList, ApplicationDetails, CreateApplication } from './containers';

export function Applications() {
  return (
    <Switch>
      <Route exact path={APPLICATIONS_PATH} component={ApplicationList} />
      <Route exact path={CREATE_APPLICATION_PATH} component={CreateApplication} />
      <Route path={APPLICATIONS_PATH + '/:applicationId'} component={ApplicationDetails} />
    </Switch>
  );
}