import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getLocationOrigin } from 'next/dist/next-server/lib/utils';

import { Container } from './styles';
import SEO from '../../components/seo';
import useFetch from '../../hooks/useFetch';
import api from '../../services/api';
import NavBar from '../../components/navbar';
import SideBar from '../../components/sidebar';
import { Page } from '../index/styles';
import Suggestions from '../../components/suggestions';
import Post, { PostInterface } from '../../components/section-post';

interface PostReponse {
  id: string;
  description: string;
  file: {
    location: string;
  };
}

interface TaliaProps {
  post: any;
}

const Talia: React.FC<TaliaProps> = ({ post }) => {
  const router = useRouter();
  const { id } = router.query;
  const { data: postData } = useFetch<PostInterface>(
    `/posts/${id}`,
    api,
    {},
    {
      initialData: post,
    },
  );

  useEffect(() => console.log(postData), [postData]);

  return (
    <>
      <SEO
        description={postData.description}
        title="Θαλία - Venha se divertir!"
        image={postData.file.location}
        url={`${getLocationOrigin()}/talia/${postData.id}`}
      />
      <NavBar />
      <Container>
        <SideBar />
        <Page>
          <Post post={postData} />
          <Suggestions />
        </Page>
      </Container>
    </>
  );
};

export default Talia;
