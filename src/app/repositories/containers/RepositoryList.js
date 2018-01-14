// @flow
import React from 'react';
import { RepositoriesListWithLoader } from '../components';
import { RootState } from '../../models';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Repository } from '../models';
import { loadRepositoriesRequest } from '../actions';
import { Grid, Button, Input, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { CREATE_REPOSITORY_PATH } from '../constants';
import { match } from 'react-router';
import { RouterState } from 'react-router-redux';
import queryString from 'query-string';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { debounceTime } from 'rxjs/operators';

function mapStateToProps({ repositories, router }: RootState) {
  return {
    ...repositories,
    router
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    loadRepositories(search) {
      return dispatch(loadRepositoriesRequest({ search }));
    }
  };
}

export interface RepositoryListProps {
  repositories: ?Repository[];
  pending: boolean;
  match: match<{ search: string }>;
  router: RouterState;
  loadRepositories: (search: string) => {};
}

export const RepositoryList = connect(mapStateToProps, mapDispatchToProps)(
  class extends React.PureComponent<RepositoryListProps> {
    search$: Subject<string>;
    searchSubscription: Subscription;

    constructor(props) {
      super(props);

      this.search$ = new Subject();
    }
    
    componentDidMount() {
      this.searchSubscription = this.search$
        .pipe(debounceTime(400))
        .subscribe((val) => this.props.loadRepositories(val));

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
      const { repositories, pending } = this.props;
      const search = this.getSearch();

      return (
        <Grid columns="2">
          <Grid.Row>
            <Grid.Column textAlign="left">
              <Button as={Link} to={CREATE_REPOSITORY_PATH} icon labelPosition="left">
                <Icon name="plus" />
                Create repository
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
              <RepositoriesListWithLoader repositories={repositories} pending={pending} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
  }
);
