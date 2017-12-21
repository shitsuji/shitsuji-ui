// @flow
import React from 'react';
import { Layout } from '../../layout';
import { ApplicationsListWithLoader } from '../components';
import { RootState } from '../../models';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { loadApplicationsRequest, ApplicationsState } from '../index';

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
          <ApplicationsListWithLoader applications={applications} pending={pending} />
        </Layout>
      );
    }
  }
);
