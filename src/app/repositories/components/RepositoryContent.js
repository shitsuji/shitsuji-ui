// @flow
import React from 'react';
import { Segment, Header, Grid, Divider, Button, Icon, Popup } from 'semantic-ui-react';
import { Repository } from '../models';
import { TextTruncate } from '../../shared';
import { getRidAsId } from '../../helpers';
import { Link } from 'react-router-dom';
import { REPOSITORIES_PATH } from '../constants';
import { Application, ApplicationsList } from '../../applications';
import styled from 'styled-components';

const PublicKeyWrapper = styled.div`
  background-color: #efefef;
  padding: 1rem;
  word-break: break-word;
`;

const KeyGrid = styled(Grid)`
  padding: 1rem 0 !important;
`;

export interface RepositoryContentProps {
  repository: Repository;
  applications: Application[];
  onDeleteRepository: (repositoryId: string) => void;
  onInitializeRepository: (repositoryId: string) => void;
}

export function RepositoryContent(props: RepositoryContentProps) {
  const { repository, applications } = props;
  const repositoryId = getRidAsId(repository);

  return (
    <Segment color="blue">
      <Grid>
        <Grid.Row>
          <Grid.Column width="8">
            <Header as="h2">
              <TextTruncate>
                {repository.name}
              </TextTruncate>
            </Header>
          </Grid.Column>
          <Grid.Column textAlign="right" width="8">
            <Popup
              content="This triggers shitsuji to download your repository from git and parse all the `shitsuji.json` config file history"
              position="right center"
              size="tiny"
              inverted
              trigger={
                <Button primary size="tiny" icon labelPosition="left"
                  onClick={() => props.onInitializeRepository(repositoryId)}>
                  <Icon name="arrow circle down" />
                  Initialize repository
                </Button>
              }
            />
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
          <Grid.Column width="16">
            <Header as="h3">
              Repository URI
              <Header.Subheader>
                {repository.url}
              </Header.Subheader>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {
            repository.publicKey &&
            <Grid.Column width="16">
              <Header as="h3">
                Public key
              </Header>
              <PublicKeyWrapper>
                {repository.publicKey}
              </PublicKeyWrapper>
              <KeyGrid>
                <Grid.Row>
                  <Grid.Column width="8">
                    <Button size="tiny" icon labelPosition="left">
                      <Icon name="pencil" />
                      Copy key
                    </Button>
                  </Grid.Column>
                  <Grid.Column width="8" textAlign="right">
                    <Button negative size="tiny" icon labelPosition="left">
                      <Icon name="pencil" />
                      Regenerate
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </KeyGrid>
            </Grid.Column>
          }
          <Grid.Column width="16">
            <Header as="h3">
              Applications in this repository
            </Header>
            <ApplicationsList applications={applications} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}