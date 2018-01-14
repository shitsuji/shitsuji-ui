// @flow
import React from 'react';
import { Segment, Header, Grid, Divider, Button, Icon, Popup } from 'semantic-ui-react';
import { Project } from '../models';
import { TextTruncate } from '../../shared';
import { getRidAsId } from '../../helpers';
import { Link } from 'react-router-dom';
import { PROJECTS_PATH } from '../constants';

export interface ProjectContentProps {
  project: Project;
  onDeleteProject: (projectId: string) => void;
}

export function ProjectContent(props: ProjectContentProps) {
  const { project } = props;
  const projectId = getRidAsId(project);

  return (
    <Segment color="blue">
      <Grid>
        <Grid.Row>
          <Grid.Column width="11">
            <Header as="h2">
              <TextTruncate>
                {project.name}
              </TextTruncate>
            </Header>
          </Grid.Column>
          <Grid.Column textAlign="right" width="5">
            <Button as={Link} to={`${PROJECTS_PATH}/${projectId}/edit`} size="tiny" icon labelPosition="left">
              <Icon name="pencil" />
              Edit project
            </Button>
            <Popup
              content="Remove project, this cannot be undone!"
              position="right center"
              size="tiny"
              inverted
              trigger={
                <Button negative size="tiny" icon
                  onClick={() => props.onDeleteProject(projectId)}>
                  <Icon name="trash" />
                </Button>
              }
            />
            
          </Grid.Column>
        </Grid.Row>
        <Divider style={{margin: '0 1rem'}} />
        <Grid.Row>
          <Grid.Column width="4">
            Application list
          </Grid.Column>
          <Grid.Column width="12">
            Content
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}