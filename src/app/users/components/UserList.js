// @flow
import React from 'react';
import { List, Segment, Header } from 'semantic-ui-react';
import styled from 'styled-components';
import { User } from '../models';
import { Link } from 'react-router-dom';
import { USERS_PATH } from '../index';
import { getRidAsId, formatDate } from '../../helpers';

const EmptySegment = styled(Segment)`
  text-align: center;
  color: grey;
`;

export interface UserListProps {
  users: User[];
}

export function UserList(props: UserListProps) {
  const users = props.users || [];

  if (users.length < 1) {
    return (
      <EmptySegment color="blue">
        We've screwed up hard, there's not users in here :O
      </EmptySegment>
    );
  }

  const items = users.map((user) => (
    <List.Item as={Link} key={user.login} to={`${USERS_PATH}/${getRidAsId(user)}`}>
      { user.createdAt &&
        <List.Content floated="right">
          {formatDate(user.createdAt)}
        </List.Content>
      }
      <List.Content>
        <Header as="h4">
          {user.login}
        </Header>
      </List.Content>
    </List.Item>
  ));
  
  return (
    <Segment color="blue">
      <List animated selection divided relaxed verticalAlign="middle">
        {items}
      </List>
    </Segment>
  );
}
