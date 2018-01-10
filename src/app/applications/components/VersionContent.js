// @flow
import React from 'react';
import { Button, Grid, Header, Icon } from 'semantic-ui-react';
import { Version } from '../models';
import { formatDate } from '../../helpers';
import { CommitContent } from './CommitContent';

export interface VersionContentProps {
  version: Version;
}

export function VersionContent(props: VersionContentProps) {
  return (
    <Grid>
      <Grid.Row verticalAlign="middle">
        <Grid.Column width="12">
          <Header as="h3">
            {props.version.number}
            {
              props.version.createdAt &&
              <Header.Subheader>
                Created at {formatDate(props.version.createdAt)}
              </Header.Subheader>
            }
          </Header>
        </Grid.Column>
        <Grid.Column textAlign="right" width="4">
          <Button size="tiny" icon labelPosition="left">
            <Icon name="pencil" />
            Edit version
          </Button>
        </Grid.Column>
      </Grid.Row>
      {
        props.version.commit &&
        <Grid.Row>
          <Grid.Column>
            <CommitContent commit={props.version.commit} />
          </Grid.Column>
        </Grid.Row>
      }
      <Grid.Row>
        <Grid.Column>
          <Header as="h3">
            Depends on
          </Header>
          Here goes dependencies list on which this app depends
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header as="h3">
            Required by
          </Header>
          Here goes dependencies list which require this version
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}