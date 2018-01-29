// @flow
import React, { Component } from 'react';
import { Form, InputOnChangeData, Button } from 'semantic-ui-react';
import { ProjectCreateData, Project } from '../models';
import { Application, ApplicationSelectWithApplications } from '../../applications';
import { getRidAsId } from '../../helpers';

export interface ProjectFormProps {
  project?: Project;
  applications?: Application;
  onSubmit: (project: ProjectCreateData, selectedApplications: string[]) => void;
}

export interface ProjectFormState {
  project: ProjectCreateData;
  selectedApplications?: string[];
}

export class ProjectForm extends Component<ProjectFormProps, ProjectFormState> {
  constructor(props: ProjectFormProps) {
    super(props);

    let name = '', selectedApplications = [];
    if (this.props.project) {
      name = this.props.project.name;
    }

    if (this.props.applications) {
      selectedApplications = this.props.applications.map((app) => getRidAsId(app));
    }

    this.state = {
      project: {
        name
      },
      selectedApplications
    };
  }

  onChange(event: SyntheticEvent<HTMLInputElement>, { name, value }: InputOnChangeData) {
    const project = { ...this.state.project, [name]: value };

    this.setState({
      project
    });
  }
  
  onChangeApplications(event: SyntheticEvent<HTMLInputElement>, { value }: InputOnChangeData) {
    this.setState({
      selectedApplications: value
    });
  }

  onSubmit() {
    const project = {
      ...this.props.project,
      ...this.state.project
    };

    this.props.onSubmit(project, this.state.selectedApplications);
  }

  render() {
    const { name } = this.state.project;
    const { selectedApplications } = this.state;

    const isDisabled = !this.state.project.name && !this.state.project.name.length;

    return (
      <Form onSubmit={(...args) => this.onSubmit(...args)}>
        <Form.Input
          defaultValue={name}
          type="text"
          label="Name"
          name="name"
          onChange={(...args) => this.onChange(...args)}
        />

        <Form.Field>
          <label>Applications that belongs to this project</label>

          <ApplicationSelectWithApplications
            onChange={(...args) => this.onChangeApplications(...args)}
            selectedApplications={selectedApplications}
          />
        </Form.Field>

        <Button type="submit" fluid primary disabled={isDisabled}>
          Submit
        </Button>
      </Form>
    );
  }
}