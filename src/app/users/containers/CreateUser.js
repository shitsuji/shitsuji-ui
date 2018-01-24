// @flow
import React from 'react';
import { UserForm } from '../components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { UserCreateData } from '../models';
import { createUserRequest } from '../actions';
import { Segment, Header, Grid, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { USERS_PATH } from '../index';

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    createUser(user: UserCreateData) {
      return dispatch(createUserRequest(user));
    }
  };
}

export const CreateUser = connect(null, mapDispatchToProps)(
  class extends React.PureComponent<{ createUser: () => {} }> {
    render() {
      return (
        <Grid columns="1">
          <Grid.Column>
            <Button as={Link} to={USERS_PATH} icon labelPosition="left">
              <Icon name="chevron left" />
              Go back
            </Button>
          </Grid.Column>

          <Grid.Column>
            <Segment color="blue">
              <Header>
                Create new user
              </Header>

              <UserForm onSubmit={this.props.createUser} />
            </Segment>
          </Grid.Column>
        </Grid>
      );
    }
  }
);
