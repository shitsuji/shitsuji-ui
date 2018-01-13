// @flow
import React from 'react';
import { Button, Grid, Header, Icon, Popup } from 'semantic-ui-react';
import { Version, Application } from '../models';
import { formatDate } from '../../helpers';
import { CommitContent } from './CommitContent';
import { getRidAsId } from '../../helpers';

export interface VersionContentProps {
  application: Application;
  version: Version;
  onDeleteVersion: (payload: { applicationId: string, versionId: string }) => void;
}

export function VersionContent(props: VersionContentProps) {
  const versionId = getRidAsId(props.version);
  const applicationId = getRidAsId(props.application);

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
          <Popup
            content="Remove version, this cannot be undone!"
            position="right center"
            size="tiny"
            inverted
            trigger={
              <Button negative size="tiny" icon
                onClick={() => props.onDeleteVersion(
                  { versionId, applicationId }
                )}>
                <Icon name="trash" />
              </Button>
            }
          />
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