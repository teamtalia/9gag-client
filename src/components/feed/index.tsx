import React, { useMemo } from 'react';
import api from '../../services/api';
import useFetch from '../../hooks/useFetch';

import { Container, PostContainer } from './styles';

interface PostsReponse {
  posts: any[];
}

const Feed: React.FC = () => {
  const { data: postData } = useFetch<PostsReponse>('/posts', api, {});
  const posts = useMemo(() => {
    if (postData) {
      return postData.posts;
    }
    return [];
  }, [postData]);

  return (
    <Container>
      {posts.map(post => (
        <PostContainer key={post.id}>
          <span>{post.description}</span>
          <img src={post.file.location} alt="Post" />
          <ul>
            {post.tags.map(tag => (
              <li>{tag.name}</li>
            ))}
          </ul>
        </PostContainer>
      ))}
    </Container>
  );
};

export default Feed;
