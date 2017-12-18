import React from 'react';
import { Navigation } from '../../navigation';
import styled from 'styled-components';
import { Container, Divider } from 'semantic-ui-react';

const NavigationContainer = styled(Container)`
  padding: 1rem 0;
`;

export function Layout(props) {
  return (
    <NavigationContainer>
      <Navigation />

      <Divider />

      {props.children}
    </NavigationContainer>
  );
}