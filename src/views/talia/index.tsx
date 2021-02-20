import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import { GetStaticPaths, GetStaticProps } from 'next';
import { getLocationOrigin } from 'next/dist/next-server/lib/utils';
import { Container } from './styles';
import SEO from '../../components/seo';
import useFetch from '../../hooks/useFetch';
import api from '../../services/api';

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
  const { data: postData } = useFetch<PostReponse>(
    `/posts/${id}`,
    api,
    {},
    {
      initialData: post,
    },
  );

  useEffect(() => {
    console.log('post from database', post);
  }, [post]);

  return (
    <>
      <SEO
        description={postData.description}
        title="Θαλία - Go Fun The World"
        image={postData.file.location}
        url={`${getLocationOrigin()}/talia/${postData.id}`}
      />
      <Container>
        {id}
        <br />
        {postData && postData.id}
      </Container>
    </>
  );
};

export default Talia;
