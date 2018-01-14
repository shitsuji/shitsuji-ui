// @flow
import React from 'react';
import { RepositoryForm } from '../components';
import { Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import { Repository } from '../models';
import { editRepositoryRequest } from '../actions';
import { Segment, Header, Grid, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { REPOSITORIES_PATH } from '../index';
import { RootState } from '../../models';
import { WithLoader } from '../../shared';
import { getRidAsId } from '../../helpers';

function mapStateToProps({ repositoryDetails }: RootState) {
  const { repository, pending } = repositoryDetails;

  return { repository, pending };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    editRepository(repository: Repository) {
      return dispatch(editRepositoryRequest(repository));
    }
  };
}

export interface EditRepositoryProps {
  repository: Repository;
  pending: boolean;
  editRepository: (repository: Repository) => void;
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithLoader
);

export const EditRepository = enhance(
  class extends React.PureComponent<EditRepositoryProps> {
    render() {
      const { repository } = this.props;

      return (
        <Grid columns="1">
          <Grid.Column>
            <Button as={Link} to={`${REPOSITORIES_PATH}/${getRidAsId(this.props.repository)}`} icon labelPosition="left">
              <Icon name="chevron left" />
              Go back
            </Button>
          </Grid.Column>

          <Grid.Column>
            <Segment color="blue">
              <Header>
                Edit repository {repository.name}
              </Header>

              <RepositoryForm repository={repository} onSubmit={this.props.editRepository} />
            </Segment>
          </Grid.Column>
        </Grid>
      );
    }
  }
);
