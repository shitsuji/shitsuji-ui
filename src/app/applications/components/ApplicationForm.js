// @flow
import React, { Component } from 'react';
import { Form, InputOnChangeData, Button } from 'semantic-ui-react';
import { ApplicationCreateData } from '../models';

export interface ApplicationFormProps {
  onSubmit: (application: ApplicationCreateData) => void;
}

export interface ApplicationFormState {
  application: ApplicationCreateData;
}

export class ApplicationForm extends Component<ApplicationFormProps, ApplicationFormState> {
  constructor(props: ApplicationFormProps) {
    super(props);

    this.state = {
      application: {
        name: '',
        key: ''
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
    this.props.onSubmit(this.state.application);
  }

  render() {
    return (
      <Form onSubmit={(...args) => this.onSubmit(...args)}>
        <Form.Input type="text" label="Name" name="name" onChange={(...args) => this.onChange(...args)} />

        <Form.Input type="text" label="Key" name="key" onChange={(...args) => this.onChange(...args)} />

        <Button type="submit" fluid primary>
          Submit
        </Button>
      </Form>
    );
  }
}