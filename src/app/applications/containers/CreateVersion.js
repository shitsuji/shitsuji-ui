// @flow
import React from 'react';
import { VersionFormWithLoader } from '../components';
import { RootState } from '../../models';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { VersionCreateData, ApplicationDetailsState } from '../models';
import { createVersionRequest } from '../actions';
import { Segment, Header, Grid, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { APPLICATIONS_PATH } from '../constants';
import { match } from 'react-router';

export interface CreateVersionProps {
  applicationDetails: ApplicationDetailsState;
  match: match<{ applicationId: string }>;
  createVersion: () => {};
}

function mapStateToProps({ applicationDetails }: RootState) {
  return { applicationDetails };
}

function mapDispatchToProps(dispatch: Dispatch, props: CreateVersionProps) {
  return {
    createVersion(version: VersionCreateData) {
      const { applicationId } = props.match.params;
      return dispatch(createVersionRequest({ version, applicationId }));
    }
  };
}

export const CreateVersion = connect(mapStateToProps, mapDispatchToProps)(
  class extends React.PureComponent<CreateVersionProps> {
    render() {
      const { applicationId } = this.props.match.params;
      const { pending } = this.props.applicationDetails;

      return (
        <Grid columns="1">
          <Grid.Column>
            <Button as={Link} to={`${APPLICATIONS_PATH}/${applicationId}`} icon labelPosition="left">
              <Icon name="chevron left" />
              Go back
            </Button>
          </Grid.Column>

          <Grid.Column>
            <Segment color="blue">
              <Header>
                Create new version
              </Header>

              <VersionFormWithLoader pending={pending} onSubmit={this.props.createVersion} />
            </Segment>
          </Grid.Column>
        </Grid>
      );
    }
  }
);
