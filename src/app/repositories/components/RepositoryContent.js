// @flow
import React from 'react';
import { Segment, Header, Grid, Divider, Button, Icon, Popup } from 'semantic-ui-react';
import { Repository } from '../models';
import { TextTruncate } from '../../shared';
import { getRidAsId } from '../../helpers';
import { Link } from 'react-router-dom';
import { REPOSITORIES_PATH } from '../constants';

export interface RepositoryContentProps {
  repository: Repository;
  onDeleteRepository: (repositoryId: string) => void;
}

export function RepositoryContent(props: RepositoryContentProps) {
  const { repository } = props;
  const repositoryId = getRidAsId(repository);

  return (
    <Segment color="blue">
      <Grid>
        <Grid.Row>
          <Grid.Column width="11">
            <Header as="h2">
              <TextTruncate>
                {repository.name}
              </TextTruncate>
            </Header>
          </Grid.Column>
          <Grid.Column textAlign="right" width="5">
            <Button as={Link} to={`${REPOSITORIES_PATH}/${repositoryId}/edit`} size="tiny" icon labelPosition="left">
              <Icon name="pencil" />
              Edit repository
            </Button>
            <Popup
              content="Remove repository, this cannot be undone!"
              position="right center"
              size="tiny"
              inverted
              trigger={
                <Button negative size="tiny" icon
                  onClick={() => props.onDeleteRepository(repositoryId)}>
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