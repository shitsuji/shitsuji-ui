// @flow
import React from 'react';
import { Layout } from '../../layout';
import { ApplicationsListWithLoader } from '../components';
import { RootState } from '../../models';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ApplicationsState } from '../models';
import { loadApplicationsRequest } from '../actions';
import { Grid, Button, Input, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { CREATE_APPLICATION_PATH } from '../constants';
import { RouterState } from 'react-router-redux';
import queryString from 'query-string';

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

export const Applications = connect(mapStateToProps, mapDispatchToProps)(
  class extends React.PureComponent<{ applications: ApplicationsState, router: RouterState } & { loadApplications: (search: string) => {} }> {
    componentDidMount() {
      this.props.loadApplications(this.getSearch());
    }

    getSearch(): string {
      const { location } = this.props.router;
      const query = queryString.parse(location.search);
      const { search } = query;

      return search || '';
    }

    render() {
      const { applications, pending } = this.props.applications;

      return (
        <Layout>
          <Grid columns="2">
            <Grid.Column textAlign="left">
              <Button as={Link} to={CREATE_APPLICATION_PATH} icon labelPosition="left">
                <Icon name="plus" />
                Create application
              </Button>
            </Grid.Column>

            <Grid.Column textAlign="right">
              <Input loading={pending} icon="search" iconPosition="left" placeholder="Search..." />
            </Grid.Column>
          </Grid>
          <ApplicationsListWithLoader applications={applications} pending={pending} />
        </Layout>
      );
    }
  }
);
