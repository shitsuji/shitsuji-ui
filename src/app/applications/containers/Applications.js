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

function mapStateToProps({ applications }: RootState) {
  return applications;
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    loadApplications() {
      return dispatch(loadApplicationsRequest());
    }
  };
}

export const Applications = connect(mapStateToProps, mapDispatchToProps)(
  class extends React.PureComponent<ApplicationsState & { loadApplications: () => {} }> {
    componentDidMount() {
      this.props.loadApplications();
    }

    render() {
      const { applications, pending } = this.props;
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
