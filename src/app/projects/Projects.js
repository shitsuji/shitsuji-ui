// @flow
import React from 'react';
import { Route, Switch } from 'react-router';
import { PROJECTS_PATH, CREATE_PROJECT_PATH } from './constants';
import { ProjectList, CreateProject, ProjectDetails } from './containers';

export function Projects() {
  return (
    <Switch>
      <Route exact path={PROJECTS_PATH} component={ProjectList} />
      <Route exact path={CREATE_PROJECT_PATH} component={CreateProject} />
      <Route path={PROJECTS_PATH + '/:projectId'} component={ProjectDetails} />
    </Switch>
  );
}