// @flow
import React from 'react';
import { List, Segment, Header } from 'semantic-ui-react';
import styled from 'styled-components';
import { Repository } from '../models';
import { Link } from 'react-router-dom';
import { REPOSITORIES_PATH } from '../constants';
import { getRidAsId, formatDate } from '../../helpers';

const EmptySegment = styled(Segment)`
  text-align: center;
  color: grey;
`;

export interface RepositoriesListProps {
  repositories: Repository[];
}

export function RepositoriesList(props: RepositoriesListProps) {
  const repositories = props.repositories || [];

  if (repositories.length < 1) {
    return (
      <EmptySegment color="blue">
        No repositories here, try adding new one :)
      </EmptySegment>
    );
  }

  const items = repositories.map((repo) => (
    <List.Item as={Link} key={repo['@rid']} to={`${REPOSITORIES_PATH}/${getRidAsId(repo)}`}>
      { repo.createdAt &&
        <List.Content floated="right">
          {formatDate(repo.createdAt)}
        </List.Content>
      }
      <List.Content>
        <Header as="h4">
          {repo.name}
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
