// @flow
import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { NavigationLink } from '../components';

export function Navigation() {
  return (
    <Grid as={Segment} inverted attached="top">
      <Grid.Column width="4" verticalAlign="middle">
        <Header as="h1" inverted>
          執事
        </Header>
      </Grid.Column>
      <Grid.Column width="12" textAlign="right">
        <NavigationLink to="/applications">
          Applications
        </NavigationLink>
        <NavigationLink to="/projects">
          Projects
        </NavigationLink>
        <NavigationLink to="/repositories">
          Repositories
        </NavigationLink>
      </Grid.Column>
    </Grid>
  );
}