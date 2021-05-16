import React, { useContext, useEffect, useMemo } from 'react';
import Feed from '../../components/feed';
import NavBar from '../../components/navbar';
import SideBar from '../../components/sidebar';
import Suggestions from '../../components/suggestions';
import AppContext from '../../contexts/AppContext';
import useFetch from '../../hooks/useFetch';
import api from '../../services/api';

import { Container, Page } from './styles';

const Index: React.FC = () => {
  const { feedOrder, feedRevalidate, setFeedRevalidate } = useContext(
    AppContext,
  );
  const { data: postData, mutate } = useFetch<{ posts: any[] }>(
    `/posts?order=${feedOrder}`,
    api,
    {},
  );
  useEffect(() => {
    if (feedRevalidate && postData) {
      setFeedRevalidate(false);
      (async () => {
        await mutate(data => data, true);
      })();
    }
  }, [feedRevalidate, postData]);

  // precisa criar um scroll fix

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
