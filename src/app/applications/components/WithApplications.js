// @flow
import { RootState } from '../../models';
import { connect } from 'react-redux';

function mapStateToApplications(state: RootState) {
  return state.applications;
}

export const WithApplications = connect(mapStateToApplications);