// @flow
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { NavigationLink } from '../components';

export function Navigation() {
  return (
    <Grid columns={1} textAlign="right" doubling>
      <Grid.Column>
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