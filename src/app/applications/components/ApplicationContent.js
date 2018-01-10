// @flow
import React from 'react';
import { Segment, Header, Grid, Divider, Button, Icon, Popup } from 'semantic-ui-react';
import { Application, Version } from '../models';
import { VersionList } from './VersionList';
import { VersionContent } from './VersionContent';
import { TextTruncate } from '../../shared';

export interface ApplicationContentProps {
  application: Application;
  versions: Version[];
  selectedVersion: ?Version;
  onSelect: (version: Version) => void;
}

export function ApplicationContent(props: ApplicationContentProps) {
  const { application, versions, selectedVersion } = props;
  const emptyContentMessage = 'Please select version from the list or create a new one :)';

  return (
    <Segment color="blue">
      <Grid>
        <Grid.Row>
          <Grid.Column width="8">
            <Header as="h2">
              <TextTruncate>
                {application.name}
              </TextTruncate>
            </Header>
          </Grid.Column>
          <Grid.Column textAlign="right" width="8">
            <Button size="tiny" icon labelPosition="left">
              <Icon name="pencil" />
              Edit application
            </Button>
            <Popup
              content="Remove application, this cannot be undone!"
              position="right center"
              size="tiny"
              inverted
              trigger={
                <Button negative size="tiny" icon>
                  <Icon name="trash" />
                </Button>
              }
            />
            
          </Grid.Column>
        </Grid.Row>
        <Divider style={{margin: '0 1rem'}} />
        <Grid.Row>
          <Grid.Column width="4">
            <VersionList versions={versions} selectedVersion={selectedVersion} onSelect={props.onSelect} />
          </Grid.Column>
          <Grid.Column width="12">
            {selectedVersion ? <VersionContent version={selectedVersion} /> : emptyContentMessage}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}