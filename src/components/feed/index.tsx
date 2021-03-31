import React, { useMemo } from 'react';
import Link from 'next/link';
import { Dropdown } from 'antd';

import {
  CommentOutlined,
  DashOutlined,
  DownOutlined,
  FacebookFilled,
  UpOutlined,
} from '@ant-design/icons';
import { getLocationOrigin } from 'next/dist/next-server/lib/utils';
import TimeAgo from 'react-timeago';
import brStrings from 'react-timeago/lib/language-strings/pt-br-short';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import api from '../../services/api';
import useFetch from '../../hooks/useFetch';
import {
  Container,
  PostContainer,
  PostHeader,
  PostMeta,
  PostWrapper,
  PostInteractions,
  InteractionButton,
  FacebookButton,
} from './styles';
import MoreActions from './components/moreactions';

interface PostProps {
  posts: any[];
}

const formatter = buildFormatter(brStrings);

const Feed: React.FC<PostProps> = ({ posts }) => {
  return (
    <Container>
      {posts.map(post => (
        <PostWrapper key={post.id}>
          <PostHeader>
            <section>
              <span />
              <span>WTF</span>
              <span>
                <TimeAgo date={post.createdAt} formatter={formatter} />
              </span>
              {post.reason && <span>{post.reason}</span>}
            </section>
            <Link href={`/talia/${post.id}`}>
              <a>
                <h1>{post.description}</h1>
              </a>
            </Link>
          </PostHeader>
          <PostContainer>
            <Link href={`/talia/${post.id}`}>
              <a>
                <img src={post.file.location} alt="Post" />
              </a>
            </Link>
          </PostContainer>
          <PostMeta>
            <a href="#points">0 pontos</a>
            {' · '}
            <a href="#comments">0 comentarios</a>
          </PostMeta>

          <PostInteractions>
            <section>
              <InteractionButton icon={<UpOutlined />} />
              <InteractionButton icon={<DownOutlined />} />
              <InteractionButton icon={<CommentOutlined />} />
              <Dropdown
                overlay={<MoreActions post={post} />}
                trigger={['click']}
              >
                <InteractionButton icon={<DashOutlined />} />
              </Dropdown>
            </section>
            <section>
              <FacebookButton
                icon={<FacebookFilled />}
                onClick={() => {
                  FB.ui(
                    {
                      display: 'popup',
                      method: 'share',
                      href: `${getLocationOrigin()}/talia/${post.id}`,
                    },
                    function (response) {
                      console.log(response);
                    },
                  );
                }}
              >
                Facebook
              </FacebookButton>
            </section>
          </PostInteractions>
        </PostWrapper>
      ))}
    </Container>
  );
};

export default Feed;
