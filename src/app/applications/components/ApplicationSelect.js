// @flow
import React from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import { Application } from '../models';
import { getRidAsId } from '../../helpers';

export interface ApplicationSelectProps {
  selectedApplications: string[];
  applications: Application[];
  onChange: (event: SyntheticEvent<HTMLElement>, data: DropdownProps) => void;
}

export function ApplicationSelect(props: ApplicationSelectProps) {
  const options = props.applications.map((app) => ({
    text: `${app.name}`,
    value: getRidAsId(app)
  }));
  
  const value = props.selectedApplications &&
    props.selectedApplications
      .map((appId) => options.find((opt) => opt.value === appId))
      .filter((opt) => !!opt)
      .map((opt) => opt.value);

  return (
    <Dropdown placeholder="Application"
      fluid multiple search selection
      value={value} options={options}
      onChange={props.onChange} />
  );
}