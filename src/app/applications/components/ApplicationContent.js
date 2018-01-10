// @flow
import React from 'react';
import { Segment, Header, Grid, Divider } from 'semantic-ui-react';
import { Application, Version } from '../models';
import { VersionList } from './VersionList';
import { VersionContent } from './VersionContent';

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
      <Header as="h2">
        {application.name}
      </Header>
      <Divider />
      <Grid>
        <Grid.Column width="4">
          <Header as="h3">
            Versions:
          </Header>
          <VersionList versions={versions} onSelect={props.onSelect} />
        </Grid.Column>
        <Grid.Column width="12">
          {selectedVersion ? <VersionContent version={selectedVersion} /> : emptyContentMessage}
        </Grid.Column>
      </Grid>
    </Segment>
  );
}