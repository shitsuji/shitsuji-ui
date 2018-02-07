// @flow
import React, { Component } from 'react';
import { Form, InputOnChangeData, Button } from 'semantic-ui-react';
import { VersionCreateData, Version, Dependency, Application } from '../models';
import { DependenciesFormConnected } from '../containers';

export interface VersionFormProps {
  version?: Version;
  application: Application;
  dependencies?: Dependency[];
  onSubmit: (payload: { version: VersionCreateData, dependencies: Dependency[] }) => void;
}

export interface VersionFormState {
  version: VersionCreateData;
  dependencies: Dependency[];
}

export class VersionForm extends Component<VersionFormProps, VersionFormState> {
  constructor(props: VersionFormProps) {
    super(props);

    let number = '';
    let dependencies = [];
    if (props.version) {
      number = props.version.number;
    }

    if (props.dependencies) {
      dependencies = props.dependencies;
    }

    this.state = {
      version: {
        number
      },
      dependencies
    };
  }

  onChange(event: SyntheticEvent<HTMLInputElement>, { name, value }: InputOnChangeData) {
    const version = { ...this.state.version, [name]: value };

    this.setState({
      version
    });
  }

  onChangeDependencies(dependencies: Dependency[]) {
    this.setState({ dependencies });
  }

  onSubmit() {
    const version = {
      ...this.props.version,
      ...this.state.version
    };

    const dependencies = [
      ...this.state.dependencies
    ];

    this.props.onSubmit({ version, dependencies });
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

        <Form.Field>
          <label>Dependencies</label>
          <DependenciesFormConnected
            baseApplication={this.props.application}
            onChange={(dependencies) => this.onChangeDependencies(dependencies)}
            dependencies={this.state.dependencies}
          />
        </Form.Field>

        <Button type="submit" fluid primary>
          Submit
        </Button>
      </Form>
    );
  }
}