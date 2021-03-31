import React, { useMemo } from 'react';
import Feed from '../../components/feed';
import NavBar from '../../components/navbar';
import SideBar from '../../components/sidebar';
import Suggestions from '../../components/suggestions';
import useFetch from '../../hooks/useFetch';
import api from '../../services/api';

import { Container, Page } from './styles';

const Index: React.FC = () => {
  const { data: postData } = useFetch<{ posts: any[] }>('/posts', api, {});
  const posts = useMemo(() => {
    if (postData) {
      return postData.posts;
    }
    return [];
  }, [postData]);

  return (
    <>
      <NavBar />
      <Container>
        <SideBar />
        <Page>
          <Feed posts={posts} />
          <Suggestions />
        </Page>
      </Container>
    </>
  );
};

export default Index;
