import React from 'react';

function onCopy(text) {
  try {
    const area = document.createElement('textarea');
    area.textContent = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    document.body.removeChild(area);
  } catch (e) {
    console.error(e.message);
  }
}

export function WithCopy(Component) {
  return function (props) {
    return <Component {...{ ...props, onCopy }}/>
  }
}