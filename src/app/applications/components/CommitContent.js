// @flow
import React from 'react';
import { Commit } from '../models';
import { Item, Header } from 'semantic-ui-react';
import styled from 'styled-components';

const CommitWrapper = styled(Item.Content)`
  background-color: #efefef;
  padding: 1rem;
`;

const CommitMessageWrapper = styled.span`
  font-size: 1.1em;
  color: grey;
  text-decoration: italic;
`;

const CommitAuthorWrapper = styled.p`
  text-align: right;
`;

export interface CommitContentProps {
  commit: Commit;
}

export function CommitContent(props: CommitContentProps) {
  return (
    <Item>
      <Header as="h3">
        Commit
        <Header.Subheader>
          {props.commit.hash}
        </Header.Subheader>
      </Header>
      <CommitWrapper>
        <CommitMessageWrapper>
          {props.commit.message}
        </CommitMessageWrapper>
        <br />
        <CommitAuthorWrapper>
          Commited by {props.commit.author}
        </CommitAuthorWrapper>
      </CommitWrapper>
    </Item>
  );
}