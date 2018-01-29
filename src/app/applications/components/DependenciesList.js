// @flow
import React from 'react';
import { List, Header } from 'semantic-ui-react';
import styled from 'styled-components';
import { Dependency } from '../models';
import { getRidAsId } from '../../helpers';
import { Link } from 'react-router-dom';
import { APPLICATIONS_PATH } from '../constants';

const EmptyParagraph = styled.p`
  color: grey;
`;

export interface DependenciesListProps {
  dependencies: Dependency[];
}

export function DependenciesList(props: DependenciesListProps) {
  const dependencies = props.dependencies || [];

  if (dependencies.length < 1) {
    return (
      <EmptyParagraph>
        No dependencies here :)
      </EmptyParagraph>
    );
  }

  const items = dependencies.map(({ application, version }) => (
    <List.Item as={Link} to={`${APPLICATIONS_PATH}/${getRidAsId(application)}`} key={application.key + version.number}>
      <List.Content>
        <Header as="h4">
          {application.name} @ {version.number}
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
