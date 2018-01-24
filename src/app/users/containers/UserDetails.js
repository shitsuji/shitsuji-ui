// @flow
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../models';
import { UserDetailsState } from '../models';
import { match } from 'react-router';
import { Dispatch } from 'redux';
import {
  loadUserDeatilsRequest,
  deleteUserRequest
} from '../actions';
import { Grid, Button, Icon } from 'semantic-ui-react';
import { USERS_PATH } from '../constants';
import { Link, Switch, Route } from 'react-router-dom';
import { UserContentWithLoader } from '../components';
import { getRidAsId } from '../../helpers';
import { EditUser } from './EditUser';
import { NotFoundWrapper } from '../../shared';

function mapStateToProps({ userDetails, router }: RootState) {
  return { userDetails };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    loadUserDetails: (userId: string) => {
      dispatch(loadUserDeatilsRequest({ userId }));
    },
    deleteUser: (userId: string) => {
      dispatch(deleteUserRequest({ userId }));
    }
  };
}

export interface UserDetailsProps {
  userDetails: UserDetailsState;
  match: match<{ userId: string }>;
  loadUserDetails: (userId: string) => void;
  deleteUser: (userId: string) => void;
}

export const UserDetails = connect(mapStateToProps, mapDispatchToProps)(class extends React.PureComponent<UserDetailsProps> {
  componentDidMount() {
    const { userId } = this.props.match.params;
    const { user } = this.props.userDetails;
    if (user && getRidAsId(user) === userId) {
      return;
    }

    this.props.loadUserDetails(userId);
  }

  render() {
    const { user, pending } = this.props.userDetails;
    const { path } = this.props.match;

    const contentProps = {
      user,
      pending,
      onDeleteUser: this.props.deleteUser
    };

    return (
      <Switch>
        <Route path={`${path}/edit`} component={EditUser} />

        <Route render={() =>
          <Grid columns="1">
            <Grid.Column>
              <Button as={Link} to={USERS_PATH} icon labelPosition="left">
                <Icon name="chevron left" />
                Go back
              </Button>
            </Grid.Column>
            <Grid.Column>
              {
                !pending && !user ?
                  <NotFoundWrapper>User not found :(</NotFoundWrapper> :
                  <UserContentWithLoader {...contentProps}/>
              }
            </Grid.Column>
          </Grid>
        }/>
      </Switch>
    );
  }
});