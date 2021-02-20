import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useEffect } from 'react';
import api from '../../services/api';
import TaliaView from '../../views/talia';

interface TaliaProps {
  post: {
    id: string;
    description: string;
    file: {
      location: string;
    };
  };
}

const Talia: React.FC<TaliaProps> = ({ post }) => {
  return <TaliaView post={post} />;
};

export default Talia;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = (await api.get(`/posts/${params.id}`)).data;
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: true,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = (await api.get('/posts')).data;

  return {
    fallback: true,
    paths: allPosts.posts.map(post => `/talia/${post.id}`),
  };
};
