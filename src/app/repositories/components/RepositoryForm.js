// @flow
import React, { Component } from 'react';
import { Form, InputOnChangeData, Button, Popup } from 'semantic-ui-react';
import { RepositoryCreateData, Repository } from '../models';

export interface RepositoryFormProps {
  repository?: Repository;
  onSubmit: (repository: RepositoryCreateData) => void;
}

export interface RepositoryFormState {
  repository: RepositoryCreateData;
}

export class RepositoryForm extends Component<RepositoryFormProps, RepositoryFormState> {
  constructor(props: RepositoryFormProps) {
    super(props);

    let name = '', url = '', branch = '';
    if (this.props.repository) {
      name = this.props.repository.name;
      url = this.props.repository.url;
      branch = this.props.repository.branch;
    }

    this.state = {
      repository: {
        name,
        url,
        branch
      }
    };
  }

  onChange(event: SyntheticEvent<HTMLInputElement>, { name, value }: InputOnChangeData) {
    const repository = { ...this.state.repository, [name]: value };

    this.setState({
      repository
    });
  }

  onSubmit() {
    const repository = {
      ...this.props.repository,
      ...this.state.repository
    };

    this.props.onSubmit(repository);
  }

  render() {
    const { name, url, branch } = this.state.repository;

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
          defaultValue={url}
          type="text"
          label="Url"
          name="url"
          onChange={(...args) => this.onChange(...args)}
        />

        <Popup
          content="Main branch from which new versions should be downloaded, by default it's 'master'"
          position="right center"
          size="tiny"
          inverted
          trigger={
            <Form.Input
              defaultValue={branch}
              type="text"
              label="Branch"
              name="branch"
              onChange={(...args) => this.onChange(...args)}
            />
          }
        />

        <Button type="submit" fluid primary>
          Submit
        </Button>
      </Form>
    );
  }
}