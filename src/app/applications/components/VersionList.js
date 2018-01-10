// @flow
import React from 'react';
import { List, Button } from 'semantic-ui-react';
import { Version } from '../models';
import styled from 'styled-components';

const EmptySegment = styled.p`
  text-align: center;
  color: grey;
`;

const TextTruncate = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
`;

export interface VersionListProps {
  versions: Version[];
  onSelect: (version: Version) => void;
}

export function VersionList(props: VersionListProps) {
  const { versions } = props;

  if (!versions || versions.length < 1) {
    return (
      <EmptySegment>
        No versions here, try adding new one :)
      </EmptySegment>
    );
  }

  const items = versions.map((version) => {
    const message = version.commit ? version.commit.message : 'No commit message available';
    
    return (
      <List.Item key={version.number}>
        <List.Content floated='right'>
          <Button size="tiny" onClick={() => props.onSelect(version)}>
            Select
          </Button>
        </List.Content>
        <List.Content>
          <List.Header>{version.number}</List.Header>
          <TextTruncate title={message}>
            {message}
          </TextTruncate>
        </List.Content>
      </List.Item>
    );
  });

  return (
    <List verticalAlign="middle" divided relaxed>
      {items}
    </List>
  );
}