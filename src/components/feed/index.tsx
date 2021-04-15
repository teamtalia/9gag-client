import React, { useMemo } from 'react';
import Post from '../post';

import { Container } from './styles';

interface PostProps {
  posts: any[];
}

const Feed: React.FC<PostProps> = ({ posts }) => {
  return (
    <Container>
      {posts.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </Container>
  );
};

export default Feed;
