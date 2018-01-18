import React from 'react';
import styled from 'styled-components';
import { Segment, Header } from 'semantic-ui-react';

const AuthContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AuthSegment = styled(Segment)`
  max-width: 450px;
  width: 100%;
`;

export function AuthLayout(props) {
  return (
    <AuthContainer>
      <Header as="h1" textAlign="center">
        執事
        <Header.Subheader>Login into your account:</Header.Subheader>
      </Header>
      <AuthSegment>
        {props.children}
      </AuthSegment>
    </AuthContainer>
  );
}