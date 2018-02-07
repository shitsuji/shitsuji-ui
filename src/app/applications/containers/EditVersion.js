// @flow
import React from 'react';
import { Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import { Application, Version, Dependency } from '../models';
import { editVersionRequest, selectVersionRequest } from '../actions';
import { Segment, Header, Grid, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { APPLICATIONS_PATH } from '../constants';
import { RootState } from '../../models';
import { WithLoader } from '../../shared';
import { getRidAsId } from '../../helpers';
import { match } from 'react-router';
import { NotFoundWrapper } from '../../shared';
import { VersionForm } from '../components';

export interface EditVersionProps {
  application: Application;
  versions: Version[];
  dependees: Dependency[];
  pending: boolean;
  match: match<{ versionId: string }>;
  selectedVersionId: string;
  selectVersion: (version: Version) => void;
  editVersion: (payload: { version: Version, applicationId: string }) => void;
}

export interface EditVersionState {
  version?: ?Version;
}

function mapStateToProps({ applicationDetails }: RootState) {
  const { application, versions, pending, dependees, selectedVersionId } = applicationDetails;

  return { application, versions, pending, dependees, selectedVersionId };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    editVersion(payload: { version: Version, applicationId: string, dependencies: Dependency[] }) {
      return dispatch(editVersionRequest(payload));
    },
    selectVersion: (version: Version) => {
      return dispatch(selectVersionRequest(version));
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

    componentDidMount() {
      if (!this.props.selectedVersionId && this.state.version) {
        this.props.selectVersion(this.state.version);
      }
    }

    componentWillReceiveProps() {
      if (!this.props.versions) {
        return;
      }

      const { versionId } = this.props.match.params;
      const version = this.props.versions.find((v) => getRidAsId(v) === versionId);

      this.setState({ version });
    }

    editVersion(payload: { version: Version, dependencies: Dependency }) {
      const applicationId = getRidAsId(this.props.application);

      this.props.editVersion({ ...payload, applicationId });
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
                    dependencies={this.props.dependees}
                    application={this.props.application}
                    version={version}
                    onSubmit={(payload) => this.editVersion(payload)}
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
