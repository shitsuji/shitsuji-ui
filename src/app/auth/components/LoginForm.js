// @flow
import React, { Component } from 'react';
import { Form, InputOnChangeData, Button } from 'semantic-ui-react';
import { LoginCredentials } from '../models';

export interface LoginFormProps {
  credentials?: LoginCredentials;
  pending: boolean;
  onSubmit: (credentials: LoginCredentials) => void;
}

export interface LoginFormState {
  credentials: LoginCredentials;
}

export class LoginForm extends Component<LoginFormProps, LoginFormState> {
  constructor(props: LoginFormProps) {
    super(props);

    let login = '', password = '';
    if (this.props.credentials) {
      login = this.props.credentials.login;
      password = this.props.credentials.password;
    }

    this.state = {
      credentials: {
        login,
        password
      }
    };
  }

  onChange(event: SyntheticEvent<HTMLInputElement>, { name, value }: InputOnChangeData) {
    const credentials = { ...this.state.credentials, [name]: value };

    this.setState({
      credentials
    });
  }

  onSubmit() {
    const credentials = {
      ...this.props.credentials,
      ...this.state.credentials
    };

    this.props.onSubmit(credentials);
  }

  render() {
    const { login, password } = this.state.credentials;

    return (
      <Form onSubmit={(...args) => this.onSubmit(...args)} loading={this.props.pending}>
        <Form.Input
          defaultValue={login}
          type="text"
          label="Login"
          name="login"
          onChange={(...args) => this.onChange(...args)}
        />

        <Form.Input
          defaultValue={password}
          type="password"
          label="Password"
          name="password"
          onChange={(...args) => this.onChange(...args)}
        />

        <Button type="submit" fluid primary>
          Submit
        </Button>
      </Form>
    );
  }
}