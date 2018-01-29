// @flow
import React from 'react';
import { UsersListWithLoader } from '../components';
import { RootState } from '../../models';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { UsersState } from '../models';
import { loadUsersRequest, deleteUserRequest } from '../actions';
import { Grid, Button, Input, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { CREATE_USER_PATH } from '../constants';
import { RouterState } from 'react-router-redux';
import queryString from 'query-string';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { debounceTime } from 'rxjs/operators';
import { AuthState } from '../../auth';

function mapStateToProps({ users, router, auth }: RootState) {
  return { users, router, auth };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    loadUsers(search) {
      return dispatch(loadUsersRequest({ search }));
    },
    deleteUser: (userId: string) => {
      dispatch(deleteUserRequest({ userId }));
    }
  };
}

export interface UserListProps {
  auth: AuthState;
  users: UsersState;
  router: RouterState;
  loadUsers: (search: string) => {};
  deleteUser: (userId: string) => {};
}

export const UserList = connect(mapStateToProps, mapDispatchToProps)(
  class extends React.PureComponent<UserListProps> {
    search$: Subject<string>;
    searchSubscription: Subscription;

    constructor(props) {
      super(props);

      this.search$ = new Subject();
    }
    
    componentDidMount() {
      this.searchSubscription = this.search$
        .pipe(debounceTime(400))
        .subscribe((val) => this.props.loadUsers(val));

      this.search$.next(this.getSearch());
    }

    componentWillUnmount() {
      if (!this.searchSubscription) {
        return;
      }

      this.searchSubscription.unsubscribe();
    }

    getSearch(): string {
      const { location } = this.props.router;
      const query = queryString.parse(location.search);
      const { search } = query;

      return search || '';
    }

    updateSearch(event, { value }) {
      this.search$.next(value);
    }

    render() {
      const { users, pending } = this.props.users;
      const { user } = this.props.auth;
      const search = this.getSearch();

      return (
        <Grid columns="2">
          <Grid.Row>
            <Grid.Column textAlign="left">
              <Button as={Link} to={CREATE_USER_PATH} icon labelPosition="left">
                <Icon name="plus" />
                Create user
              </Button>
            </Grid.Column>

            <Grid.Column textAlign="right">
              <Input defaultValue={search}
                loading={pending}
                icon="search"
                iconPosition="left"
                placeholder="Search..."
                onChange={(...args) => this.updateSearch(...args)}
                disabled={pending}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width="16">
              <UsersListWithLoader users={users} currentUser={user} pending={pending} onDeleteUser={this.props.deleteUser} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
  }
);
