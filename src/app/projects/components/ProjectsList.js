// @flow
import React from 'react';
import { List, Segment, Header } from 'semantic-ui-react';
import styled from 'styled-components';
import { Project } from '../models';
import { Link } from 'react-router-dom';
import { PROJECTS_PATH } from '../constants';
import { getRidAsId, formatDate } from '../../helpers';

const EmptySegment = styled(Segment)`
  text-align: center;
  color: grey;
`;

export interface ProjectsListProps {
  projects: Project[];
}

export function ProjectsList(props: ProjectsListProps) {
  const projects = props.projects || [];

  if (projects.length < 1) {
    return (
      <EmptySegment color="blue">
        No projects here, try adding new one :)
      </EmptySegment>
    );
  }

  const items = projects.map((app) => (
    <List.Item as={Link} key={app['@rid']} to={`${PROJECTS_PATH}/${getRidAsId(app)}`}>
      { app.createdAt &&
        <List.Content floated="right">
          {formatDate(app.createdAt)}
        </List.Content>
      }
      <List.Content>
        <Header as="h4">
          {app.name}
        </Header>
      </List.Content>
    </List.Item>
  ));
  
  return (
    <Segment color="blue">
      <List animated selection divided relaxed verticalAlign="middle">
        {items}
      </List>
    </Segment>
  );
}
