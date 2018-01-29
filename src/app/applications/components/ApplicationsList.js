// @flow
import React from 'react';
import { List, Header } from 'semantic-ui-react';
import styled from 'styled-components';
import { Application } from '../models';
import { Link } from 'react-router-dom';
import { APPLICATIONS_PATH } from '../index';
import { getRidAsId, formatDate } from '../../helpers';

const EmptyParagraph = styled.p`
  text-align: center;
  color: grey;
`;

const ApplicationsListSubheader = styled(Header.Subheader)`
  color: rgba(0,0,0,.6) !important;
`;

export interface ApplicationsListProps {
  applications: Application[];
}

export function ApplicationsList(props: ApplicationsListProps) {
  const applications = props.applications || [];

  if (applications.length < 1) {
    return (
      <EmptyParagraph color="blue">
        No apps here, try adding new one :)
      </EmptyParagraph>
    );
  }

  const items = applications.map((app) => (
    <List.Item as={Link} key={app.key} to={`${APPLICATIONS_PATH}/${getRidAsId(app)}`}>
      { app.createdAt &&
        <List.Content floated="right">
          {formatDate(app.createdAt)}
        </List.Content>
      }
      <List.Content>
        <Header as="h4">
          {app.name}
          <ApplicationsListSubheader>
            {app.key}
          </ApplicationsListSubheader>
        </Header>
      </List.Content>
    </List.Item>
  ));
  
  return (
    <List animated selection divided relaxed verticalAlign="middle">
      {items}
    </List>
  );
}
