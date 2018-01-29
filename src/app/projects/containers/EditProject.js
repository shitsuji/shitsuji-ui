// @flow
import React from 'react';
import { ProjectForm } from '../components';
import { Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import { Project } from '../models';
import { editProjectRequest } from '../actions';
import { Segment, Header, Grid, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { PROJECTS_PATH } from '../constants';
import { RootState } from '../../models';
import { WithLoader } from '../../shared';
import { getRidAsId } from '../../helpers';
import { Application } from '../../applications';

function mapStateToProps({ projectDetails }: RootState) {
  const { project, pending, applications } = projectDetails;

  return { project, pending, applications };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    editProject(project: Project, selectedApplications: string[]) {
      return dispatch(editProjectRequest({
        project,
        selectedApplications
      }));
    }
  };
}

export interface EditProjectProps {
  project: Project;
  applications: Application[];
  pending: boolean;
  editProject: (project: Project, selectedApplications: string[]) => void;
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithLoader
);

export const EditProject = enhance(
  class extends React.PureComponent<EditProjectProps> {
    render() {
      const { project, applications } = this.props;

      return (
        <Grid columns="1">
          <Grid.Column>
            <Button as={Link} to={`${PROJECTS_PATH}/${getRidAsId(this.props.project)}`} icon labelPosition="left">
              <Icon name="chevron left" />
              Go back
            </Button>
          </Grid.Column>

          <Grid.Column>
            <Segment color="blue">
              <Header>
                Edit project {project.name}
              </Header>

              <ProjectForm project={project} applications={applications} onSubmit={this.props.editProject} />
            </Segment>
          </Grid.Column>
        </Grid>
      );
    }
  }
);
