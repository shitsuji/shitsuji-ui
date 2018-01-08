// @flow
import React from 'react';
import type { Node } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

interface NavigationLinkProps {
  to: string;
  children: Node;
}

export function NavigationLink(props: NavigationLinkProps) {
  const { children, ...rest } = props;
  return (
    <Button as={NavLink} {...rest} basic inverted activeClassName="primary">
      {children}
    </Button>
  );
}