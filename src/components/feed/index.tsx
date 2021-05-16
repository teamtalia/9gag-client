import React from 'react';
import { BlankState } from '../../views/u/styles';
import Post from '../post';

import { Container } from './styles';

interface PostProps {
  posts: any[];
}

const Feed: React.FC<PostProps> = ({ posts }) => {
  return (
    <Container>
      {!!posts.length && posts.map(post => <Post post={post} key={post.id} />)}
      {!posts.length && (
        <BlankState>
          <h3>Nenhuma publicação para mostrar</h3>
        </BlankState>
      )}
    </Container>
  );
};

export default Feed;
