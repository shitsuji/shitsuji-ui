// @flow
import React from 'react';
import { List, Segment } from 'semantic-ui-react';
import styled from 'styled-components';
import { Application } from '../models';

const EmptySegment = styled(Segment)`
  text-align: center;
  color: grey;
`;

export interface ApplicationsListProps {
  applications: Application[];
}

export function ApplicationsList(props: ApplicationsListProps) {
  const applications = props.applications || [];

  if (applications.length < 1) {
    return (
      <EmptySegment color="blue">
        No apps here, try adding new one :)
      </EmptySegment>
    );
  }

  const items = applications.map((app) => (
    <List.Item key={app.key}>
      <List.Content>
        <List.Header>{app.name}</List.Header>
      </List.Content>
    </List.Item>
  ));
  
  return (
    <Segment color="blue">
      <List divided relaxed>
        {items}
      </List>
    </Segment>
  );
}
