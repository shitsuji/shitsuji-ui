// @flow
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../models';
import { ApplicationDetailsState, Version } from '../models';
import { match } from 'react-router';
import { Dispatch } from 'redux';
import {
  loadApplicationDeatilsRequest,
  selectVersionRequest,
  deleteApplicationRequest,
  deleteVersionRequest
} from '../actions';
import { Grid, Button, Icon } from 'semantic-ui-react';
import { APPLICATIONS_PATH, VERSIONS_PATH } from '../constants';
import { Link, Switch, Route } from 'react-router-dom';
import { ApplicationContentWithLoader } from '../components';
import { getRidAsId } from '../../helpers';
import { CreateVersion } from './CreateVersion';
import { EditApplication } from './EditApplication';
import { NotFoundWrapper } from '../../shared';
import { EditVersion } from './EditVersion';

function mapStateToProps({ applicationDetails, router }: RootState) {
  return { applicationDetails };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    loadApplicationDetails: (applicationId: string) => {
      dispatch(loadApplicationDeatilsRequest({ applicationId }));
    },
    selectVersion: (version: Version) => {
      dispatch(selectVersionRequest(version));
    },
    deleteApplication: (applicationId: string) => {
      dispatch(deleteApplicationRequest({ applicationId }));
    },
    deleteVersion: (payload: { applicationId: string, versionId: string }) => {
      dispatch(deleteVersionRequest(payload));
    }
  };
}

export interface ApplicationDetailsProps {
  applicationDetails: ApplicationDetailsState;
  match: match<{ applicationId: string }>;
  loadApplicationDetails: (applicationId: string) => void;
  selectVersion: (version: Version) => void;
  deleteApplication: (applicationId: string) => void;
  deleteVersion: (payload: { applicationId: string, versionId: string }) => void;
}

export const ApplicationDetails = connect(mapStateToProps, mapDispatchToProps)(class extends React.PureComponent<ApplicationDetailsProps> {
  componentDidMount() {
    const { applicationId } = this.props.match.params;
    const { application } = this.props.applicationDetails;
    if (application && getRidAsId(application) === applicationId) {
      return;
    }

    this.props.loadApplicationDetails(applicationId);
  }

  componentWillReceiveProps(newProps: ApplicationDetailsProps) {
    const { applicationId } = newProps.match.params;
    if (applicationId === this.props.match.params.applicationId) {
      return;
    }

    this.props.loadApplicationDetails(applicationId);
  }

  render() {
    const { application, versions, pending, selectedVersionId, dependees, dependers } = this.props.applicationDetails;
    const selectedVersion = versions && versions.find((v) => getRidAsId(v) === selectedVersionId);
    const { path } = this.props.match;

    const contentProps = {
      application,
      versions,
      pending,
      selectedVersion,
      dependees,
      dependers,
      onSelect: this.props.selectVersion,
      onDeleteApplication: this.props.deleteApplication,
      onDeleteVersion: this.props.deleteVersion
    };

    return (
      <Switch>
        <Route path={`${path}${VERSIONS_PATH}/:versionId`} component={EditVersion} />
        <Route path={`${path}${VERSIONS_PATH}`} component={CreateVersion} />

        <Route path={`${path}/edit`} component={EditApplication} />

        <Route render={() =>
          <Grid columns="1">
            <Grid.Column>
              <Button as={Link} to={APPLICATIONS_PATH} icon labelPosition="left">
                <Icon name="chevron left" />
                Go back
              </Button>
            </Grid.Column>
            <Grid.Column>
              {
                !pending && !application ?
                  <NotFoundWrapper>Application not found :(</NotFoundWrapper> :
                  <ApplicationContentWithLoader {...contentProps}/>
              }
            </Grid.Column>
          </Grid>
        }/>
      </Switch>
    );
  }
});