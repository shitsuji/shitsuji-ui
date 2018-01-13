// @flow
import React from 'react';
import { ApplicationForm } from '../components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ApplicationCreateData } from '../models';
import { createApplicationRequest } from '../actions';
import { Segment, Header, Grid, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { APPLICATIONS_PATH } from '../index';

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    createApplication(application: ApplicationCreateData) {
      return dispatch(createApplicationRequest(application));
    }
  };
}

export const CreateApplication = connect(null, mapDispatchToProps)(
  class extends React.PureComponent<{ createApplication: () => {} }> {
    render() {
      return (
        <Grid columns="1">
          <Grid.Column>
            <Button as={Link} to={APPLICATIONS_PATH} icon labelPosition="left">
              <Icon name="chevron left" />
              Go back
            </Button>
          </Grid.Column>

          <Grid.Column>
            <Segment color="blue">
              <Header>
                Create new application
              </Header>

              <ApplicationForm onSubmit={this.props.createApplication} />
            </Segment>
          </Grid.Column>
        </Grid>
      );
    }
  }
);
