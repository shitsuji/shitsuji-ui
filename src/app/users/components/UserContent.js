// @flow
import React from 'react';
import { Segment, Header, Grid, Divider, Button, Icon, Popup } from 'semantic-ui-react';
import { User } from '../models';
import { TextTruncate } from '../../shared';
import { getRidAsId } from '../../helpers';
import { Link } from 'react-router-dom';
import { USERS_PATH } from '../constants';

export interface UserContentProps {
  user: User;
  onDeleteUser: (userId: string) => void;
}

export function UserContent(props: UserContentProps) {
  const { user } = props;
  const userId = getRidAsId(user);

  return (
    <Segment color="blue">
      <Grid>
        <Grid.Row>
          <Grid.Column width="11">
            <Header as="h2">
              <TextTruncate>
                {user.login}
              </TextTruncate>
            </Header>
          </Grid.Column>
          <Grid.Column textAlign="right" width="5">
            <Button as={Link} to={`${USERS_PATH}/${userId}/edit`} size="tiny" icon labelPosition="left">
              <Icon name="pencil" />
              Edit user
            </Button>
            <Popup
              content="Remove user, this cannot be undone!"
              position="right center"
              size="tiny"
              inverted
              trigger={
                <Button negative size="tiny" icon
                  onClick={() => props.onDeleteUser(userId)}>
                  <Icon name="trash" />
                </Button>
              }
            />
            
          </Grid.Column>
        </Grid.Row>
        <Divider style={{margin: '0 1rem'}} />
        <Grid.Row>
          <Grid.Column width="16">
            Content
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}