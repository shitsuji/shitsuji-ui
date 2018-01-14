// @flow
import React from 'react';
import { ProjectForm } from '../components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ProjectCreateData } from '../models';
import { createProjectRequest } from '../actions';
import { Segment, Header, Grid, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { PROJECTS_PATH } from '../index';

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    createProject(project: ProjectCreateData) {
      return dispatch(createProjectRequest(project));
    }
  };
}

export const CreateProject = connect(null, mapDispatchToProps)(
  class extends React.PureComponent<{ createProject: () => {} }> {
    render() {
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
