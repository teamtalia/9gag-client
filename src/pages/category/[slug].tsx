import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import Feed from '../../components/feed';
import { Container, Page } from '../../components/layout';
import NavBar from '../../components/navbar';
import SideBar from '../../components/sidebar';
import Suggestions from '../../components/suggestions';
import useFetch from '../../hooks/useFetch';
import api from '../../services/api';

// import { Container } from './styles';

const Category: React.FC = () => {
  const {
    query: { slug },
  } = useRouter();

  const { data: postData, mutate } = useFetch<{ posts: any[] }>(
    `/categories/${slug}/posts`,
    api,
    {},
  );

  const posts = useMemo(() => (postData && postData.posts) || [], [postData]);
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

export default Category;
