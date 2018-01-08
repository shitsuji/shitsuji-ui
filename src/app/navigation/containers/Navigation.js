// @flow
import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { NavigationLink } from '../components';

export function Navigation() {
  return (
    <Grid as={Segment} columns={2} doubling inverted attached="top">
      <Grid.Column verticalAlign="middle">
        <Header as="h1" inverted>
          執事
        </Header>
      </Grid.Column>
      <Grid.Column textAlign="right">
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