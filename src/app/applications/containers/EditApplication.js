// @flow
import React from 'react';
import { ApplicationForm } from '../components';
import { Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import { Application } from '../models';
import { editApplicationRequest } from '../actions';
import { Segment, Header, Grid, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { APPLICATIONS_PATH } from '../index';
import { RootState } from '../../models';
import { WithLoader } from '../../shared';
import { getRidAsId } from '../../helpers';

function mapStateToProps({ applicationDetails }: RootState) {
  const { application, pending } = applicationDetails;

  return { application, pending };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    editApplication(application: Application) {
      return dispatch(editApplicationRequest(application));
    }
  };
}

export interface EditApplicationProps {
  application: Application;
  pending: boolean;
  editApplication: (application: Application) => void;
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithLoader
);

export const EditApplication = enhance(
  class extends React.PureComponent<EditApplicationProps> {
    render() {
      const { application } = this.props;

      return (
        <Grid columns="1">
          <Grid.Column>
            <Button as={Link} to={`${APPLICATIONS_PATH}/${getRidAsId(this.props.application)}`} icon labelPosition="left">
              <Icon name="chevron left" />
              Go back
            </Button>
          </Grid.Column>

          <Grid.Column>
            <Segment color="blue">
              <Header>
                Edit application {application.name}
              </Header>

              <ApplicationForm application={application} onSubmit={this.props.editApplication} />
            </Segment>
          </Grid.Column>
        </Grid>
      );
    }
  }
);
