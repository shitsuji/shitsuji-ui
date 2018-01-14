// @flow
import React from 'react';
import { RepositoryForm } from '../components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RepositoryCreateData } from '../models';
import { createRepositoryRequest } from '../actions';
import { Segment, Header, Grid, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { REPOSITORIES_PATH } from '../index';

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    createRepository(repository: RepositoryCreateData) {
      return dispatch(createRepositoryRequest(repository));
    }
  };
}

export const CreateRepository = connect(null, mapDispatchToProps)(
  class extends React.PureComponent<{ createRepository: () => {} }> {
    render() {
      return (
        <Grid columns="1">
          <Grid.Column>
            <Button as={Link} to={REPOSITORIES_PATH} icon labelPosition="left">
              <Icon name="chevron left" />
              Go back
            </Button>
          </Grid.Column>

          <Grid.Column>
            <Segment color="blue">
              <Header>
                Create new repository
              </Header>

              <RepositoryForm onSubmit={this.props.createRepository} />
            </Segment>
          </Grid.Column>
        </Grid>
      );
    }
  }
);
