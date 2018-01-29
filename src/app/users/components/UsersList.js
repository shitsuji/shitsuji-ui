// @flow
import React from 'react';
import { List, Segment, Header, Button, Icon, Popup } from 'semantic-ui-react';
import styled from 'styled-components';
import { User } from '../models';
import { Link } from 'react-router-dom';
import { USERS_PATH } from '../index';
import { getRidAsId } from '../../helpers';

const EmptySegment = styled(Segment)`
  text-align: center;
  color: grey;
`;

export interface UserListProps {
  currentUser: User;
  users: User[];
  onDeleteUser: (userId: string) => void;
}

export function UsersList(props: UserListProps) {
  const users = props.users || [];
  const currentUserId = getRidAsId(props.currentUser);

  if (users.length < 1) {
    return (
      <EmptySegment color="blue">
        There's not users in here, try changing your search phrase
      </EmptySegment>
    );
  }

  const items = users.map((user) => {
    const userId = getRidAsId(user);
    const isCurrentUser = userId === currentUserId;

    return (
      <List.Item key={user.login}>
        <List.Content floated="right">
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
                onClick={() => props.onDeleteUser(userId)}
                disabled={isCurrentUser}>
                <Icon name="trash" />
              </Button>
            }
          />
        </List.Content>
        <List.Content>
          <Header as="h4">
            {user.login}
          </Header>
        </List.Content>
      </List.Item>
    );
  });
  
  return (
    <Segment color="blue">
      <List selection divided relaxed verticalAlign="middle">
        {items}
      </List>
    </Segment>
  );
}
