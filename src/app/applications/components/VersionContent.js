// @flow
import React from 'react';
import { Button, Grid, Header, Icon, Popup } from 'semantic-ui-react';
import { Version, Application, Dependency } from '../models';
import { formatDate } from '../../helpers';
import { CommitContent } from './CommitContent';
import { getRidAsId } from '../../helpers';
import { Link } from 'react-router-dom';
import { APPLICATIONS_PATH, VERSIONS_PATH } from '../constants';
import { TextTruncate } from '../../shared';
import { DependenciesList } from './DependenciesList';

export interface VersionContentProps {
  application: Application;
  version: Version;
  dependees: Dependency[];
  dependers: Dependency[];
  onDeleteVersion: (payload: { applicationId: string, versionId: string }) => void;
}

export function VersionContent(props: VersionContentProps) {
  const versionId = getRidAsId(props.version);
  const applicationId = getRidAsId(props.application);

  return (
    <Grid>
      <Grid.Row verticalAlign="middle">
        <Grid.Column width="10">
          <Header as="h3" >
            <TextTruncate>{props.version.number}</TextTruncate>
            {
              props.version.createdAt &&
              <Header.Subheader>
                Created at {formatDate(props.version.createdAt)}
              </Header.Subheader>
            }
          </Header>
        </Grid.Column>
        <Grid.Column textAlign="right" width="6">
          <Button as={Link} size="tiny" icon labelPosition="left"
            to={`${APPLICATIONS_PATH}/${applicationId}${VERSIONS_PATH}/${versionId}`}>
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
          <DependenciesList dependencies={props.dependees} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header as="h3">
            Required by
          </Header>
          <DependenciesList dependencies={props.dependers} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}