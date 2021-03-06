// @flow
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../models';
import { RepositoryDetailsState } from '../models';
import { match } from 'react-router';
import { Dispatch } from 'redux';
import {
  loadRepositoryDeatilsRequest,
  deleteRepositoryRequest,
  initializeRepositoryRequest,
  regenerateRepositoryRequest
} from '../actions';
import { Grid, Button, Icon } from 'semantic-ui-react';
import { REPOSITORIES_PATH } from '../constants';
import { Link, Switch, Route } from 'react-router-dom';
import { RepositoryContentEnhanced } from '../components';
import { NotFoundWrapper } from '../../shared';
import { EditRepository } from './EditRepository';

function mapStateToProps({ repositoryDetails }: RootState) {
  return { repositoryDetails };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    loadRepositoryDetails: (repositoryId: string) => {
      dispatch(loadRepositoryDeatilsRequest({ repositoryId }));
    },
    deleteRepository: (repositoryId: string) => {
      dispatch(deleteRepositoryRequest({ repositoryId }));
    },
    initializeRepository: (repositoryId: string) => {
      dispatch(initializeRepositoryRequest({ repositoryId }));
    },
    regenerateRepository: (repositoryId: string) => {
      dispatch(regenerateRepositoryRequest({ repositoryId }));
    }
  };
}

export interface RepositoryDetailsProps {
  repositoryDetails: RepositoryDetailsState;
  match: match<{ repositoryId: string }>;
  loadRepositoryDetails: (repositoryId: string) => void;
  deleteRepository: (repositoryId: string) => void;
  initializeRepository: (repositoryId: string) => void;
  regenerateRepository: (repositoryId: string) => void;
}

export const RepositoryDetails = connect(mapStateToProps, mapDispatchToProps)(class extends React.PureComponent<RepositoryDetailsProps> {
  componentDidMount() {
    const { repositoryId } = this.props.match.params;

    this.props.loadRepositoryDetails(repositoryId);
  }

  render() {
    const { repository, pending, applications } = this.props.repositoryDetails;
    const { path } = this.props.match;

    const contentProps = {
      repository,
      applications,
      pending,
      onInitializeRepository: this.props.initializeRepository,
      onDeleteRepository: this.props.deleteRepository,
      onRegenerateRepository: this.props.regenerateRepository
    };

    return (
      <Switch>
        <Route path={`${path}/edit`} component={EditRepository} />

        <Route render={() =>
          <Grid columns="1">
            <Grid.Column>
              <Button as={Link} to={REPOSITORIES_PATH} icon labelPosition="left">
                <Icon name="chevron left" />
                Go back
              </Button>
            </Grid.Column>
            <Grid.Column>
              {
                !pending && !repository ?
                  <NotFoundWrapper>Repository not found :(</NotFoundWrapper> :
                  <RepositoryContentEnhanced {...contentProps}/>
              }
            </Grid.Column>
          </Grid>
        }/>
      </Switch>
    );
  }
});