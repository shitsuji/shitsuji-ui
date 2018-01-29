// @flow
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../models';
import { ProjectDetailsState } from '../models';
import { match } from 'react-router';
import { Dispatch } from 'redux';
import { loadProjectDeatilsRequest, deleteProjectRequest } from '../actions';
import { Grid, Button, Icon } from 'semantic-ui-react';
import { PROJECTS_PATH } from '../constants';
import { Link, Switch, Route } from 'react-router-dom';
import { ProjectContentWithLoader } from '../components';
import { getRidAsId } from '../../helpers';
import { NotFoundWrapper } from '../../shared';
import { EditProject } from './EditProject';

function mapStateToProps({ projectDetails }: RootState) {
  return { projectDetails };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    loadProjectDetails: (projectId: string) => {
      dispatch(loadProjectDeatilsRequest({ projectId }));
    },
    deleteProject: (projectId: string) => {
      dispatch(deleteProjectRequest({ projectId }));
    }
  };
}

export interface ProjectDetailsProps {
  projectDetails: ProjectDetailsState;
  match: match<{ projectId: string }>;
  loadProjectDetails: (projectId: string) => void;
  deleteProject: (projectId: string) => void;
}

export const ProjectDetails = connect(mapStateToProps, mapDispatchToProps)(class extends React.PureComponent<ProjectDetailsProps> {
  componentDidMount() {
    const { projectId } = this.props.match.params;
    const { project } = this.props.projectDetails;
    if (project && getRidAsId(project) === projectId) {
      return;
    }

    this.props.loadProjectDetails(projectId);
  }

  render() {
    const { project, pending, applications } = this.props.projectDetails;
    const { path } = this.props.match;

    const contentProps = {
      project,
      applications,
      pending,
      onDeleteProject: this.props.deleteProject
    };

    return (
      <Switch>
        <Route path={`${path}/edit`} component={EditProject} />

        <Route render={() =>
          <Grid columns="1">
            <Grid.Column>
              <Button as={Link} to={PROJECTS_PATH} icon labelPosition="left">
                <Icon name="chevron left" />
                Go back
              </Button>
            </Grid.Column>
            <Grid.Column>
              {
                !pending && !project ?
                  <NotFoundWrapper>Project not found :(</NotFoundWrapper> :
                  <ProjectContentWithLoader {...contentProps}/>
              }
            </Grid.Column>
          </Grid>
        }/>
      </Switch>
    );
  }
});