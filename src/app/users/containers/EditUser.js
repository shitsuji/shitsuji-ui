// @flow
import React from 'react';
import { UserForm } from '../components';
import { Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import { User } from '../models';
import { editUserRequest } from '../actions';
import { Segment, Header, Grid, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { USERS_PATH } from '../index';
import { RootState } from '../../models';
import { WithLoader } from '../../shared';
import { getRidAsId } from '../../helpers';

function mapStateToProps({ userDetails }: RootState) {
  const { user, pending } = userDetails;

  return { user, pending };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    editUser(user: User) {
      return dispatch(editUserRequest(user));
    }
  };
}

export interface EditUserProps {
  user: User;
  pending: boolean;
  editUser: (user: User) => void;
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithLoader
);

export const EditUser = enhance(
  class extends React.PureComponent<EditUserProps> {
    render() {
      const { user } = this.props;

      return (
        <Grid columns="1">
          <Grid.Column>
            <Button as={Link} to={`${USERS_PATH}/${getRidAsId(this.props.user)}`} icon labelPosition="left">
              <Icon name="chevron left" />
              Go back
            </Button>
          </Grid.Column>

          <Grid.Column>
            <Segment color="blue">
              <Header>
                Edit user {user.login}
              </Header>

              <UserForm user={user} onSubmit={this.props.editUser} />
            </Segment>
          </Grid.Column>
        </Grid>
      );
    }
  }
);
