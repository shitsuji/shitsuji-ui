import React from 'react';
import { showSuccess, showError } from '../../helpers';

function onCopy(text) {
  try {
    const area = document.createElement('textarea');
    area.textContent = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    document.body.removeChild(area);
    showSuccess('Copied to clipboard');
  } catch (e) {
    showError('Error while copying to clipboard');
  }
}

export function WithCopy(Component) {
  return function (props) {
    return <Component {...{ ...props, onCopy }}/>;
  };
}