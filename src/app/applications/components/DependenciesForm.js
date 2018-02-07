// @flow
import React from 'react';
import { Application, Version, Dependency } from '../models';
import { Grid, List, Header, Button, Icon, Dropdown } from 'semantic-ui-react';
import { TextTruncate } from '../../shared';
import styled from 'styled-components';

const DependenciesFormGrid = styled(Grid)`
  padding-top: 1rem !important;
`;

export interface DependenciesFormProps {
  dependencies: Dependency[];
  baseApplication: Application;
  currentApplication: Application;
  applications: Application[];
  versions?: Version[];
  disabled: boolean;
  onDeleteDependency: (dependencies: Dependency[]) => void;
  onSelectVersion: (dependencies: Dependency[]) => void;
  onSelectApplication: (application: Application) => void;
}

export function DependenciesForm(props: DependenciesFormProps) {
  const applications = props.applications && props.baseApplication ?
    props.applications.filter((app) =>
      app.key !== props.baseApplication.key && 
      !props.dependencies.find((dep) => dep.application.key === app.key)
    ) :
    [];

  const currentApplication = props.currentApplication && applications.find((app) => app.key === props.currentApplication.key);

  const dependenciesItems = props.dependencies.map((dep) => (
    <List.Item key={dep.application.key + dep.version.number}>
      <List.Content floated="right">
        <Button negative size="tiny" icon
          onClick={() => props.onDeleteDependency(props.dependencies.filter((d) => d !== dep))}>
          <Icon name="trash" />
        </Button>
      </List.Content>
      <List.Content>
        <Header as="span" size="tiny">
          <TextTruncate>
            {dep.application.name} @ {dep.version.number}
          </TextTruncate>
        </Header>
      </List.Content>
    </List.Item>
  ));

  const applicationsOptions = applications.map((app) => ({
    key: app.key,
    text: app.name,
    value: app.key
  }));
  
  let versionsOptions = [];
  if (currentApplication && props.versions) {
    versionsOptions = props.versions.map((ver) => ({
      key: ver.number,
      text: ver.number,
      value: ver.number
    }));
  }
  
  return (
    <DependenciesFormGrid>
      { !!dependenciesItems && !!dependenciesItems.length && 
        <Grid.Row >
          <Grid.Column width="16">
            <List animated selection>
              {dependenciesItems}
            </List>
          </Grid.Column>
        </Grid.Row>
      }
      <Grid.Row>
        <Grid.Column width="8">
          <Dropdown
            placeholder="Select Application"
            fluid
            search
            selection
            disabled={props.disabled}
            options={applicationsOptions}
            onChange={(event, { value }) => props.onSelectApplication(
              props.applications.find((a) => a.key === value)
            )}
          />
        </Grid.Column>
        <Grid.Column width="8">
          <Dropdown
            placeholder="Select Version"
            fluid
            search
            selection
            disabled={props.disabled || !currentApplication}
            options={versionsOptions}
            onChange={(event, { value }) => currentApplication && props.onSelectVersion([
              ...props.dependencies,
              {
                version: props.versions.find((v) => v.number === value),
                application: currentApplication
              }
            ])}
          />
        </Grid.Column>
      </Grid.Row>
    </DependenciesFormGrid>
  );
}
