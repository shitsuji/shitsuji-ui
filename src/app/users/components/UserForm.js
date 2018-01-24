// @flow
import React, { Component } from 'react';
import { Form, InputOnChangeData, Button } from 'semantic-ui-react';
import { UserCreateData, User } from '../models';

export interface UserFormProps {
  user?: User;
  onSubmit: (user: UserCreateData) => void;
}

export interface UserFormState {
  user: UserCreateData;
}

export class UserForm extends Component<UserFormProps, UserFormState> {
  constructor(props: UserFormProps) {
    super(props);

    let login = '';
    if (this.props.user) {
      login = this.props.user.login;
    }

    this.state = {
      user: {
        login
      }
    };
  }

  onChange(event: SyntheticEvent<HTMLInputElement>, { name, value }: InputOnChangeData) {
    const user = { ...this.state.user, [name]: value };

    this.setState({ user });
  }

  onSubmit() {
    const user = {
      ...this.props.user,
      ...this.state.user
    };

    this.props.onSubmit(user);
  }

  render() {
    const { login, password } = this.state.user;

    return (
      <Form onSubmit={(...args) => this.onSubmit(...args)}>
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