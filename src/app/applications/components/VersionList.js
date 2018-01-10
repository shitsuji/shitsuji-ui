// @flow
import React from 'react';
import { List, Button, Grid, Header, Icon, Divider } from 'semantic-ui-react';
import { Version } from '../models';
import styled from 'styled-components';
import { TextTruncate } from '../../shared';

const EmptySegment = styled.p`
  text-align: center;
  color: grey;
`;

const SelectButton = styled(Button)`
  min-width: 82px;
`;

export interface VersionListProps {
  versions: Version[];
  selectedVersion: ?Version;
  onSelect: (version: Version) => void;
}

export function VersionList(props: VersionListProps) {
  const { versions, selectedVersion } = props;
  let items;

  if (!versions || versions.length < 1) {
    items = (
      <EmptySegment>
        No versions here, try adding new one :)
      </EmptySegment>
    );
  } else {
    items = versions.map((version) => {
      const message = version.commit ? version.commit.message : 'No commit message available';
      const isSelected = selectedVersion && selectedVersion === version;
  
      return (
        <List.Item key={version.number}>
          <List.Content floated='right'>
            <SelectButton size="tiny" onClick={() => !isSelected && props.onSelect(version)} primary={isSelected} disabled={isSelected}>
              {isSelected ? 'Selected' : 'Select'}
            </SelectButton>
          </List.Content>
          <List.Content>
            <List.Header>
              {version.number}
            </List.Header>
            <TextTruncate title={message}>
              {message}
            </TextTruncate>
          </List.Content>
        </List.Item>
      );
    });
  }

  return (
    <Grid>
      <Grid.Row verticalAlign="middle">
        <Grid.Column width="6">
          <Header as="h3">
            <TextTruncate>
              Versions:
            </TextTruncate>
          </Header>
        </Grid.Column>
        <Grid.Column textAlign="right" width="10">
          <Button size="tiny" icon labelPosition="left">
            <Icon name="plus" />
            Add version
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Divider style={{margin: '0 1rem'}} />
      <Grid.Row>
        <Grid.Column>
          <List verticalAlign="middle" divided relaxed>
            {items}
          </List>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}