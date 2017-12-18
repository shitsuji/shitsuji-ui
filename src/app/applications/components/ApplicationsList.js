import React from 'react';
import { List, Segment } from 'semantic-ui-react';
import styled from 'styled-components';

const ApplicationsListItem = styled(List.Item)`
  padding: 1rem 0 !important;

  &:first-child {
    padding: 0 0 1rem 0 !important;
  }
  
  &:last-child {
    padding: 1rem 0 0 0 !important;
  }
`;

export function ApplicationsList(props) {
  return (
    <Segment>
      <List divided relaxed>
        <ApplicationsListItem>
          <List.Content>
            <List.Header>Snickerdoodle</List.Header>
            An excellent companion
          </List.Content>
        </ApplicationsListItem>
        <ApplicationsListItem>
          <List.Content>
            <List.Header>Poodle</List.Header>
            A poodle, its pretty basic
          </List.Content>
        </ApplicationsListItem>
        <ApplicationsListItem>
          <List.Content>
            <List.Header>Paulo</List.Header>
            He's also a dog
          </List.Content>
        </ApplicationsListItem>
      </List>
    </Segment>
  );
}
