// @flow
import React from 'react';
import { ProjectForm } from '../components';
import { Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import { ProjectCreateData } from '../models';
import { createProjectRequest } from '../actions';
import { Segment, Header, Grid, Button, Icon, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { PROJECTS_PATH } from '../index';
import { loadApplicationsRequest } from '../../applications';
import { RootState } from '../../models';

function mapStateToProps(state: RootState) {
  const pending = state.applications.pending;
  
  return { pending };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    loadApplications() {
      return dispatch(loadApplicationsRequest({}));
    },
    createProject(project: ProjectCreateData, selectedApplications: string[]) {
      return dispatch(createProjectRequest({
        project,
        selectedApplications
      }));
    }
  };
}

export interface CreateProjectProps {
  pending: boolean;
  createProject: (project: ProjectCreateData) => {};
  loadApplications: () => {};
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps)
);

export const CreateProject = enhance(
  class extends React.PureComponent<CreateProjectProps> {
    componentDidMount() {
      this.props.loadApplications();
    }
    
    render() {
      if (this.props.pending) {
        return <Loader active />;
      }

      return (
        <Grid columns="1">
          <Grid.Column>
            <Button as={Link} to={PROJECTS_PATH} icon labelPosition="left">
              <Icon name="chevron left" />
              Go back
            </Button>
          </Grid.Column>

          <Grid.Column>
            <Segment color="blue">
              <Header>
                Create new project
              </Header>

              <ProjectForm onSubmit={this.props.createProject} />
            </Segment>
          </Grid.Column>
        </Grid>
      );
    }
  }
);
