// @flow
import React, { Component } from 'react';
import { Form, InputOnChangeData, Button } from 'semantic-ui-react';
import { VersionCreateData, Version } from '../models';

export interface VersionFormProps {
  version?: Version;
  onSubmit: (version: VersionCreateData) => void;
}

export interface VersionFormState {
  version: VersionCreateData;
}

export class VersionForm extends Component<VersionFormProps, VersionFormState> {
  constructor(props: VersionFormProps) {
    super(props);

    let number = '';
    if (props.version) {
      number = props.version.number;
    }

    this.state = {
      version: {
        number
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
    const version = {
      ...this.props.version,
      ...this.state.version
    };

    this.props.onSubmit(version);
  }

  render() {
    const { number } = this.state.version;

    return (
      <Form onSubmit={(...args) => this.onSubmit(...args)}>
        <Form.Input
          defaultValue={number}
          type="text"
          label="Number"
          name="number"
          onChange={(...args) => this.onChange(...args)}
        />

        <Button type="submit" fluid primary>
          Submit
        </Button>
      </Form>
    );
  }
}