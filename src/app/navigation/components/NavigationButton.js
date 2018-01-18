// @flow
import React from 'react';
import type { Node } from 'react';
import { Button } from 'semantic-ui-react';

interface NavigationButtonProps {
  children: Node;
  active?: boolean;
}

export function NavigationButton(props: NavigationButtonProps) {
  const { children, ...rest } = props;

  return (
    <Button {...rest} basic inverted primary={props.active}>
      {children}
    </Button>
  );
}