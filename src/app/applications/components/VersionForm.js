// @flow
import React, { Component } from 'react';
import { Form, InputOnChangeData, Button } from 'semantic-ui-react';
import { VersionCreateData } from '../models';

export interface VersionFormProps {
  onSubmit: (version: VersionCreateData) => void;
}

export interface VersionFormState {
  version: VersionCreateData;
}

export class VersionForm extends Component<VersionFormProps, VersionFormState> {
  constructor(props: VersionFormProps) {
    super(props);

    this.state = {
      version: {
        number: ''
      }
    };
  }

  onChange(event: SyntheticEvent<HTMLInputElement>, { name, value }: InputOnChangeData) {
    const version = { ...this.state.version, [name]: value };

    this.setState({
      version
    });
  }

  onSubmit() {
    this.props.onSubmit(this.state.version);
  }

  render() {
    return (
      <Form onSubmit={(...args) => this.onSubmit(...args)}>
        <Form.Input type="text" label="Number" name="number" onChange={(...args) => this.onChange(...args)} />

        <Button type="submit" fluid primary>
          Submit
        </Button>
      </Form>
    );
  }
}