// @flow
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../models';
import { ApplicationDetailsState, Version } from '../models';
import { RouterState } from 'react-router-redux';
import { match } from 'react-router';
import { Dispatch } from 'redux';
import { loadApplicationDeatilsRequest, selectVersion } from '../actions';
import { Grid, Button, Icon } from 'semantic-ui-react';
import { APPLICATIONS_PATH } from '../constants';
import { Link } from 'react-router-dom';
import { ApplicationContentWithLoader } from '../components';
import styled from 'styled-components';

const NotFoundWrapper = styled.h2`
  color: grey;
  text-align: center;
`;

function mapStateToProps({ applicationDetails, router }: RootState) {
  return { applicationDetails, router };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    loadApplicationDetails: (applicationId: string) => {
      dispatch(loadApplicationDeatilsRequest({ applicationId }));
    },
    selectVersion: (version: Version) => {
      dispatch(selectVersion(version));
    }
  };
}

export interface ApplicationDetailsProps {
  applicationDetails: ApplicationDetailsState;
  router: RouterState;
  match: match<{ applicationId: string }>;
  loadApplicationDetails: (applicationId: string) => void;
  selectVersion: (version: Version) => void;
}

export const ApplicationDetails = connect(mapStateToProps, mapDispatchToProps)(class extends React.PureComponent<ApplicationDetailsProps> {
  componentDidMount() {
    const { applicationId } = this.props.match.params;
    this.props.loadApplicationDetails(applicationId);
  }

  render() {
    const { application, versions, pending, selectedVersion } = this.props.applicationDetails;

    const contentProps = {
      application,
      versions,
      pending,
      selectedVersion,
      onSelect: this.props.selectVersion
    };

    return (
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
    );
  }
});