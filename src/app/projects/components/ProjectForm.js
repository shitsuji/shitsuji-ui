// @flow
import React, { Component } from 'react';
import { Form, InputOnChangeData, Button } from 'semantic-ui-react';
import { ProjectCreateData, Project } from '../models';

export interface ProjectFormProps {
  project?: Project;
  onSubmit: (project: ProjectCreateData) => void;
}

export interface ProjectFormState {
  project: ProjectCreateData;
}

export class ProjectForm extends Component<ProjectFormProps, ProjectFormState> {
  constructor(props: ProjectFormProps) {
    super(props);

    let name = '';
    if (this.props.project) {
      name = this.props.project.name;
    }

    this.state = {
      project: {
        name
      }
    };
  }

  onChange(event: SyntheticEvent<HTMLInputElement>, { name, value }: InputOnChangeData) {
    const project = { ...this.state.project, [name]: value };

    this.setState({
      project
    });
  }

  onSubmit() {
    const project = {
      ...this.props.project,
      ...this.state.project
    };

    this.props.onSubmit(project);
  }

  render() {
    const { name } = this.state.project;

    return (
      <Form onSubmit={(...args) => this.onSubmit(...args)}>
        <Form.Input
          defaultValue={name}
          type="text"
          label="Name"
          name="name"
          onChange={(...args) => this.onChange(...args)}
        />

        <Button type="submit" fluid primary>
          Submit
        </Button>
      </Form>
    );
  }
}