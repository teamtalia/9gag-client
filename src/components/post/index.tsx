import React, { useContext, useMemo } from 'react';
import Link from 'next/link';
import { Dropdown, message } from 'antd';
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

import { mutate } from 'swr';
import MoreActions from './components/moreactions';
import PostSchema from '../../schemas/post';

import {
  Container,
  PostContainer,
  PostHeader,
  PostMeta,
  PostInteractions,
  InteractionButton,
  FacebookButton,
} from './styles';
import AuthContext from '../../contexts/AuthContext';
import api from '../../services/api';
import AppContext from '../../contexts/AppContext';

const formatter = buildFormatter(brStrings);

interface PostProps {
  post: PostSchema;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { user, signed } = useContext(AuthContext);
  const { feedOrder } = useContext(AppContext);

  const points = useMemo(
    () => post.votes?.reduce((old, current) => old + current.voted, 0) || 0,
    [post],
  );

  const Upvoted = useMemo(() => {
    if (signed) {
      if (post.votes?.find(el => el.user.id === user.id && el.voted === 1)) {
        return true;
      }
    }
    return false;
  }, [post, signed, user]);

  const Dowvoted = useMemo(() => {
    if (signed) {
      if (post.votes?.find(el => el.user.id === user.id && el.voted === -1)) {
        return true;
      }
    }
    return false;
  }, [post, signed, user]);

  const handleVote = async (element, vote) => {
    if (signed) {
      try {
        await api.post(`/posts/vote`, {
          postId: post.id,
          vote,
        });
        await mutate(`/posts?order=${feedOrder}`, data => data, true);
        element.target.blur();
      } catch (e) {
        if (e.message) message.error(e.message);
      }
    } else {
      message.info('Você deve se autenticar primeiro.');
    }
  };

  return (
    <Container key={post.id}>
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
        <a>{`${points} Pontos`}</a>
        {' · '}
        <Link href={`/talia/${post.id}`}>
          <a>{`${post.comments.length} Comentários`}</a>
        </Link>
      </PostMeta>

      <PostInteractions>
        <section>
          <InteractionButton
            icon={<UpOutlined />}
            active={Upvoted}
            onClick={e => handleVote(e, 1)}
          />
          <InteractionButton
            icon={<DownOutlined />}
            active={Dowvoted}
            onClick={e => handleVote(e, -1)}
          />
          <Link href={`/talia/${post.id}#comments`}>
            <InteractionButton icon={<CommentOutlined />} />
          </Link>
          <Dropdown overlay={<MoreActions post={post} />} trigger={['click']}>
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
    </Container>
  );
};

export default Post;
