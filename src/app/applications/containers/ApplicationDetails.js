// @flow
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../models';
import { ApplicationDetailsState } from '../models';
import { RouterState } from 'react-router-redux';
import { match } from 'react-router';
import { Dispatch } from 'redux';
import { loadApplicationDeatilsRequest } from '../actions';
import { Grid, Button, Icon } from 'semantic-ui-react';
import { APPLICATIONS_PATH } from '../index';
import { Link } from 'react-router-dom';

function mapStateToProps({ applicationDetails, router }: RootState) {
  return { applicationDetails, router };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    loadApplicationDetails: (applicationId: string) => {
      dispatch(loadApplicationDeatilsRequest({ applicationId }));
    }
  };
}

export interface ApplicationDetailsProps {
  applicationDetails: ApplicationDetailsState;
  router: RouterState;
  match: match<{ applicationId: string }>;
  loadApplicationDetails: (applicationId: string) => void;
}

export const ApplicationDetails = connect(mapStateToProps, mapDispatchToProps)(class extends React.PureComponent<ApplicationDetailsProps> {
  constructor(props: ApplicationDetailsProps) {
    super(props);
  }

  componentDidMount() {
    const { applicationId } = this.props.match.params;
    this.props.loadApplicationDetails(applicationId);
  }

  render() {
    return (
      <Grid>
        <Grid.Column>
          <Button as={Link} to={APPLICATIONS_PATH} icon labelPosition="left">
            <Icon name="chevron left" />
            Go back
          </Button>
        </Grid.Column>
      </Grid>
    );
  }
});