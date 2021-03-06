// @flow
import React from 'react';
import { Segment, Header, Grid, Divider, Button, Icon, Popup } from 'semantic-ui-react';
import { Application, Version, Dependency } from '../models';
import { VersionList } from './VersionList';
import { VersionContent } from './VersionContent';
import { TextTruncate } from '../../shared';
import { getRidAsId } from '../../helpers';
import { Link } from 'react-router-dom';
import { APPLICATIONS_PATH } from '../constants';

export interface ApplicationContentProps {
  application: Application;
  versions: Version[];
  selectedVersion: ?Version;
  dependees: Dependency[];
  dependers: Dependency[];
  onSelect: (version: Version) => void;
  onDeleteApplication: (applicationId: string) => void;
  onDeleteVersion: (payload: { applicationId: string, versionId: string }) => void;
}

export function ApplicationContent(props: ApplicationContentProps) {
  const { application, versions, selectedVersion, dependees, dependers } = props;
  const emptyContentMessage = 'Please select version from the list or create a new one :)';
  const applicationId = getRidAsId(application);

  return (
    <Segment color="blue">
      <Grid>
        <Grid.Row>
          <Grid.Column width="11">
            <Header as="h2">
              <TextTruncate>
                {application.name}
              </TextTruncate>
              {
                application.isGenerated &&
                <Header.Subheader>(Generated)</Header.Subheader>
              }
            </Header>
          </Grid.Column>
          <Grid.Column textAlign="right" width="5">
            <Button as={Link} to={`${APPLICATIONS_PATH}/${applicationId}/edit`} size="tiny" icon labelPosition="left">
              <Icon name="pencil" />
              Edit application
            </Button>
            <Popup
              content="Remove application, this cannot be undone!"
              position="right center"
              size="tiny"
              inverted
              trigger={
                <Button negative size="tiny" icon
                  onClick={() => props.onDeleteApplication(applicationId)}>
                  <Icon name="trash" />
                </Button>
              }
            />
            
          </Grid.Column>
        </Grid.Row>
        <Divider style={{margin: '0 1rem'}} />
        <Grid.Row>
          <Grid.Column width="4">
            <VersionList
              applicationId={getRidAsId(application)}
              versions={versions}
              selectedVersion={selectedVersion}
              onSelect={props.onSelect}
            />
          </Grid.Column>
          <Grid.Column width="12">
            {selectedVersion ?
              <VersionContent
                application={application}
                version={selectedVersion}
                onDeleteVersion={props.onDeleteVersion}
                dependees={dependees}
                dependers={dependers}
              /> :
              emptyContentMessage
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}