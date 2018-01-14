// @flow
import { Record } from '../models';

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
  pending: boolean;
}