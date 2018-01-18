// @flow
import React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState } from '../../models';
import { AuthState, LoginCredentials } from '../models';
import { AuthLayout, LoginForm } from '../components';
import { loginRequest } from '../actions';

function mapStateToProps({ auth }: RootState) {
  return auth;
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    login(credentials: LoginCredentials) {
      dispatch(loginRequest(credentials));
    }
  };
}

export interface LoginProps extends AuthState {
  login: (credentials: LoginCredentials) => void;
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(function (props: LoginProps) {
  return (
    <AuthLayout>
      <LoginForm onSubmit={props.login} pending={props.pending} />
    </AuthLayout>
  );
});