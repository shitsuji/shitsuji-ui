// @flow
import React from 'react';
import { ApplicationsListWithLoader } from '../components';
import { RootState } from '../../models';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ApplicationsState } from '../models';
import { loadApplicationsRequest } from '../actions';
import { Grid, Button, Input, Icon, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { CREATE_APPLICATION_PATH } from '../constants';
import { RouterState } from 'react-router-redux';
import queryString from 'query-string';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { debounceTime } from 'rxjs/operators';

function mapStateToProps({ applications, router }: RootState) {
  return { applications, router };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    loadApplications(search) {
      return dispatch(loadApplicationsRequest({ search }));
    }
  };
}

export const ApplicationList = connect(mapStateToProps, mapDispatchToProps)(
  class extends React.PureComponent<{ applications: ApplicationsState, router: RouterState } & { loadApplications: (search: string) => {} }> {
    search$: Subject<string>;
    searchSubscription: Subscription;

    constructor(props) {
      super(props);

      this.search$ = new Subject();
    }
    
    componentDidMount() {
      this.searchSubscription = this.search$
        .pipe(debounceTime(400))
        .subscribe((val) => this.props.loadApplications(val));

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
      const { applications, pending } = this.props.applications;
      const search = this.getSearch();

      return (
        <Grid columns="2">
          <Grid.Row>
            <Grid.Column textAlign="left">
              <Button as={Link} to={CREATE_APPLICATION_PATH} icon labelPosition="left">
                <Icon name="plus" />
                Create application
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
              <Segment color="blue">
                <ApplicationsListWithLoader applications={applications} pending={pending} />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
  }
);
