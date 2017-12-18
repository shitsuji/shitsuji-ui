// @flow
import React from 'react';
import type { Node } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

interface NavigationLinkProps {
  to: string;
  children: Node;
}

export function NavigationLink(props: NavigationLinkProps) {
  const { children, ...rest } = props;
  return (
    <Button as={Link} {...rest} basic>
      {children}
    </Button>
  );
}