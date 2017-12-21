// @flow
import React from 'react';
import { List, Segment } from 'semantic-ui-react';
import styled from 'styled-components';
import { Application } from '../models';

const ApplicationsListItem = styled(List.Item)`
  padding: 1rem 0 !important;

  &:first-child {
    padding: 0 0 1rem 0 !important;
  }
  
  &:last-child {
    padding: 1rem 0 0 0 !important;
  }
`;

export interface ApplicationsListProps {
  applications: Application[];
}

export function ApplicationsList(props: ApplicationsListProps) {
  const applications = props.applications || [];

  const items = applications.map((app) => (
    <ApplicationsListItem key={app.key}>
      <List.Content>
        <List.Header>{app.name}</List.Header>
      </List.Content>
    </ApplicationsListItem>
  ));
  
  return (
    <Segment>
      <List divided relaxed>
        {items}
      </List>
    </Segment>
  );
}
