// @flow
import React from 'react';
import { Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import { Application, Version } from '../models';
import { editVersionRequest } from '../actions';
import { Segment, Header, Grid, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { APPLICATIONS_PATH } from '../index';
import { RootState } from '../../models';
import { WithLoader } from '../../shared';
import { getRidAsId } from '../../helpers';
import { match } from 'react-router';
import { NotFoundWrapper } from '../../shared';
import { VersionForm } from '../components';

export interface EditVersionProps {
  application: Application;
  versions: Version[];
  pending: boolean;
  match: match<{ versionId: string }>;
  editVersion: (payload: { version: Version, applicationId: string }) => void;
}

export interface EditVersionState {
  version?: ?Version;
}

function mapStateToProps({ applicationDetails }: RootState) {
  const { application, versions, pending } = applicationDetails;

  return { application, versions, pending };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    editVersion(payload: { version: Version, applicationId: string }) {
      return dispatch(editVersionRequest(payload));
    }
  };
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithLoader
);

export const EditVersion = enhance(
  class extends React.PureComponent<EditVersionProps, EditVersionState> {
    constructor(props) {
      super(props);

      const { versionId } = props.match.params;
      const version = props.versions.find((v) => getRidAsId(v) === versionId);

      this.state = { version };
    }

    componentWillReceiveProps() {
      if (!this.props.versions) {
        return;
      }

      const { versionId } = this.props.match.params;
      const version = this.props.versions.find((v) => getRidAsId(v) === versionId);

      this.setState({ version });
    }

    editVersion(version: Version) {
      const applicationId = getRidAsId(this.props.application);

      this.props.editVersion({ version, applicationId });
    }
    
    render() {
      const { version } = this.state;

      return (
        <Grid columns="1">
          <Grid.Column>
            <Button as={Link} to={`${APPLICATIONS_PATH}/${getRidAsId(this.props.application)}`} icon labelPosition="left">
              <Icon name="chevron left" />
              Go back
            </Button>
          </Grid.Column>
          <Grid.Column>
            {
              version ?
                <Segment color="blue">
                  <Header>
                    Edit version #{version.number}
                  </Header>

                  <VersionForm
                    version={version}
                    onSubmit={(version) => this.editVersion(version)}
                  />
                </Segment>
                :
                <NotFoundWrapper>Version not found :(</NotFoundWrapper>
            }
          </Grid.Column>
        </Grid>
      );
    }
  }
);
