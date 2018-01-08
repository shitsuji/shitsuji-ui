import React from 'react';
import { Navigation } from '../../navigation';
import styled from 'styled-components';
import { Container } from 'semantic-ui-react';

const NavigationContainer = styled(Container)`
  padding: 1rem 0;
`;

export function Layout(props) {
  return (
    <Container fluid>
      <Navigation />
      
      <NavigationContainer>
        {props.children}
      </NavigationContainer>
    </Container>
  );
}