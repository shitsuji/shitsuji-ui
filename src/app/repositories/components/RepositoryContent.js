// @flow
import React from 'react';
import { Segment, Header, Grid, Divider, Button, Icon, Popup, Input } from 'semantic-ui-react';
import { Repository } from '../models';
import { TextTruncate, WithCopy } from '../../shared';
import { getRidAsId } from '../../helpers';
import { Link } from 'react-router-dom';
import { REPOSITORIES_PATH } from '../constants';
import { Application, ApplicationsList } from '../../applications';
import styled from 'styled-components';
import { BASE_URL } from '../../constants';

const PublicKeyWrapper = styled.div`
  background-color: #efefef;
  padding: 1rem;
  word-break: break-word;
`;

const KeyGrid = styled(Grid)`
  padding: 1rem 0 !important;
`;

interface UrlInputProps {
  url: string;
  onCopy: (url: string) => void;
}

const UrlInput = WithCopy(function (props: UrlInputProps) {
  return (
    <Input value={props.url} action actionPosition="left" fluid>
      <Button icon labelPosition="left" onClick={() => props.onCopy(props.url)}>
        <Icon name="copy" />
        Copy URI
      </Button>
      <input disabled />
    </Input>
  );
});

export interface RepositoryContentProps {
  repository: Repository;
  applications: Application[];
  onCopy: (text: string) => void;
  onDeleteRepository: (repositoryId: string) => void;
  onInitializeRepository: (repositoryId: string) => void;
  onRegenerateRepository: (repositoryId: string) => void;
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
          <Grid.Column width="16">
            <Header as="h3">
              Repository webhook URI
            </Header>
          </Grid.Column>

          <Grid.Column width="16">
            <UrlInput url={`${BASE_URL}/webhook/${repository.key}`} />
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
                    <Button
                      size="tiny"
                      icon
                      labelPosition="left"
                      onClick={() => props.onCopy(repository.publicKey)}>
                      <Icon name="copy" />
                      Copy key
                    </Button>
                  </Grid.Column>
                  <Grid.Column width="8" textAlign="right">
                    <Popup
                      content="Regenerate keypair in case of private key compromise, this requires you to update SSH key in your git repository also"
                      position="right center"
                      size="tiny"
                      inverted
                      trigger={
                        <Button
                          negative
                          size="tiny"
                          icon
                          labelPosition="left"
                          onClick={() => props.onRegenerateRepository(repositoryId)}>
                          <Icon name="refresh" />
                          Regenerate key
                        </Button>
                      }
                    /> 
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