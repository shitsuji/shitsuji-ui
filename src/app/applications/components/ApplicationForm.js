// @flow
import React, { Component } from 'react';
import { Form, InputOnChangeData, Button } from 'semantic-ui-react';
import { ApplicationCreateData, Application } from '../models';

export interface ApplicationFormProps {
  application?: Application;
  onSubmit: (application: ApplicationCreateData) => void;
}

export interface ApplicationFormState {
  application: ApplicationCreateData;
}

export class ApplicationForm extends Component<ApplicationFormProps, ApplicationFormState> {
  constructor(props: ApplicationFormProps) {
    super(props);

    let name = '', key = '';
    if (this.props.application) {
      name = this.props.application.name;
      key = this.props.application.key;
    }

    this.state = {
      application: {
        name,
        key
      }
    };
  }

  onChange(event: SyntheticEvent<HTMLInputElement>, { name, value }: InputOnChangeData) {
    const application = { ...this.state.application, [name]: value };

    this.setState({
      application
    });
  }

  onSubmit() {
    const application = {
      ...this.props.application,
      ...this.state.application
    };

    this.props.onSubmit(application);
  }

  render() {
    const { name, key } = this.state.application;

    return (
      <Form onSubmit={(...args) => this.onSubmit(...args)}>
        <Form.Input
          defaultValue={name}
          type="text"
          label="Name"
          name="name"
          onChange={(...args) => this.onChange(...args)}
        />

        <Form.Input
          defaultValue={key}
          type="text"
          label="Key"
          name="key"
          onChange={(...args) => this.onChange(...args)}
        />

        <Button type="submit" fluid primary>
          Submit
        </Button>
      </Form>
    );
  }
}