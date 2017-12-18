// @flow
import { Link } from 'react-router-dom';
import React from 'react';

interface NavigationLinkProps {
  to: string;
}

export function NavigationLink(props: NavigationLinkProps) {
  return (
    <Link to={props.to} />
  );
}