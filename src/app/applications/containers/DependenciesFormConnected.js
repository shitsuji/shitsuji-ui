// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dependency, Application, Version } from '../models';
import { RootState } from '../../models';
import * as axios from 'axios';
import { getRidAsId } from '../../helpers';
import { DependenciesForm } from '../components';
import { loadApplicationsRequest } from '../actions';

function mapStateToProps({ applications }: RootState) {
  return {
    applications: applications.applications,
    pending: applications.pending
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadApplications: () => {
      dispatch(loadApplicationsRequest({}));
    }
  };
}

export interface DependenciesFormConnectedProps {
  applications: Application[];
  baseApplication: Application;
  dependencies: Dependency[];
  pending: boolean;
  onChange: (dependencies: Dependency[]) => void;
  loadApplications: () => void;
}

export interface DependenciesFormConnectedState {
  currentApplication: Application | null;
  pending: boolean;
  versions: Version[];
}

export const DependenciesFormConnected = connect(mapStateToProps, mapDispatchToProps)(
  class extends Component<DependenciesFormConnectedProps, DependenciesFormConnectedState> {
    constructor(props: DependenciesFormConnectedProps) {
      super(props);

      this.state = {
        currentApplication: null,
        pending: false,
        versions: []
      };
    }

    componentDidMount() {
      this.props.loadApplications();
    }

    async selectApplication(application: Application) {
      this.setState({
        currentApplication: application,
        pending: true
      });
      const applicationId = getRidAsId(application);

      try {
        const res = await axios.get(`/applications/${applicationId}/versions`);

        this.setState({
          versions: res.data,
          pending: false
        });
      } catch (e) {
        this.setState({
          versions: [],
          pending: false
        });
      }
    }

    selectVersion(dependencies: Dependency[]) {
      this.setState({
        currentApplication: null,
        versions: []
      });

      this.props.onChange(dependencies);
    }

    render() {
      const { applications, dependencies, baseApplication } = this.props;
      const { currentApplication, versions } = this.state;
      const disabled = this.props.pending || this.state.pending;

      return (
        <DependenciesForm
          applications={applications}
          baseApplication={baseApplication}
          currentApplication={currentApplication}
          versions={versions}
          disabled={disabled}
          dependencies={dependencies}
          onDeleteDependency={(...args) => this.props.onChange(...args)}
          onSelectApplication={(...args) => this.selectApplication(...args)}
          onSelectVersion={(...args) => this.selectVersion(...args)}
        />
      );
    }
  }
);
