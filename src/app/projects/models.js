// @flow
import { Record } from '../models';
import { Application } from '../applications';

export interface ProjectCreateData {
  name: string;
}

export interface Project extends ProjectCreateData, Record {
  createdAt: Date;
}

export interface ProjectsState {
  projects: ?Project[];
  pending: boolean;
}

export interface ProjectDetailsState {
  project: ?Project;
  applications: ?Application[];
  pending: boolean;
}