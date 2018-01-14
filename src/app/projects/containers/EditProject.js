// @flow
import React from 'react';
import { ProjectForm } from '../components';
import { Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import { Project } from '../models';
import { editProjectRequest } from '../actions';
import { Segment, Header, Grid, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { PROJECTS_PATH } from '../index';
import { RootState } from '../../models';
import { WithLoader } from '../../shared';
import { getRidAsId } from '../../helpers';

function mapStateToProps({ projectDetails }: RootState) {
  const { project, pending } = projectDetails;

  return { project, pending };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    editProject(project: Project) {
      return dispatch(editProjectRequest(project));
    }
  };
}

export interface EditProjectProps {
  project: Project;
  pending: boolean;
  editProject: (project: Project) => void;
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithLoader
);

export const EditProject = enhance(
  class extends React.PureComponent<EditProjectProps> {
    render() {
      const { project } = this.props;

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

              <ProjectForm project={project} onSubmit={this.props.editProject} />
            </Segment>
          </Grid.Column>
        </Grid>
      );
    }
  }
);
