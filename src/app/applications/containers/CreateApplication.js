// @flow
import React from 'react';
import { Layout } from '../../layout';
import { ApplicationForm } from '../components';
import { RootState } from '../../models';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ApplicationsState, ApplicationCreateData } from '../models';
import { createApplicationRequest } from '../actions';
import { Segment, Header } from 'semantic-ui-react';

function mapStateToProps({ applications }: RootState) {
  return applications;
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    createApplication(application: ApplicationCreateData) {
      return dispatch(createApplicationRequest(application));
    }
  };
}

export const CreateApplication = connect(mapStateToProps, mapDispatchToProps)(
  class extends React.PureComponent<ApplicationsState & { createApplication: () => {} }> {
    render() {
      return (
        <Layout>
          <Segment>
            <Header>
              Create new application
            </Header>

            <ApplicationForm onSubmit={this.props.createApplication} />
          </Segment>
        </Layout>
      );
    }
  }
);
