import React from 'react';
import { Loader } from 'semantic-ui-react';

export function WithLoader(Component) {
  return function (props) {
    if (props.pending) {
      return <Loader active />;
    }

    return <Component {...props} />;
  };
}