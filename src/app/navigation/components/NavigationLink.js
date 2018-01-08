// @flow
import React from 'react';
import type { Node } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

interface NavigationLinkProps {
  to: string;
  children: Node;
}

class NavLinkWrapper extends React.PureComponent<NavLinkProps> {
  render() {
    return <NavLink {...this.props} />;
  }
}

export function NavigationLink(props: NavigationLinkProps) {
  const { children, ...rest } = props;

  return (
    <Button as={NavLinkWrapper} {...rest} basic inverted activeClassName="primary">
      {children}
    </Button>
  );
}