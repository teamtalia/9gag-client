import {
  DownOutlined,
  UpOutlined,
  DashOutlined,
  FacebookFilled,
} from '@ant-design/icons';
import { Dropdown, message } from 'antd';
import { getLocationOrigin } from 'next/dist/next-server/lib/utils';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { mutate } from 'swr';
import useFetch from '../../hooks/useFetch';
import api from '../../services/api';
import DoComment from '../docomment';
import Comment from '../comment';
import MoreActions from '../post/components/moreactions';

import {
  Container,
  Header,
  PostInteractions,
  InteractionButton,
  FacebookButton,
  PostContainer,
  CommentsHeader,
} from './styles';
import { VoteSchema } from '../../schemas/post';
import AuthContext from '../../contexts/AuthContext';

export interface PostInterface {
  tags: any[];
  comments: any[];
  sensitive: boolean;
  originalPoster: string;
  id: string;
  file: {
    mimetype: string;
    location: string;
  };
  description: string;
  votes?: VoteSchema[];
}

interface HashProps {
  comment_id?: string;
}
interface PostProps {
  post: PostInterface;
  reason?: string;
}
interface CommentsReponse {
  comments: any[];
}

const Post: React.FC<PostProps> = ({ post, reason }) => {
  const [order, setOrder] = useState<'hot' | 'fresh'>('hot');

  const { user, signed } = useContext(AuthContext);

  const { data: commentData } = useFetch<CommentsReponse>(
    `/posts/${post.id}/comments?order=${order}`,
    api,
    {},
  );

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

  const [commentToOpen, setCommentToOpen] = useState<string>(null);

  function afterComment() {
    mutate(`/posts/${post.id}`, data => data, true);
    mutate(`/posts/${post.id}/comments?order=${order}`, data => data, true);
  }

  useEffect(() => {
    const hash = window.location.hash
      .replace('#', '')
      .split('&')
      .map(e => e.split('='))
      .reduce(
        (p, [k, v]) => ({
          ...p,
          [k]: v,
        }),
        {},
      ) as HashProps;
    if (hash.comment_id) {
      setCommentToOpen(hash.comment_id);
    }
  }, []);

  const handleVote = async (element, vote) => {
    if (signed) {
      try {
        await api.post(`/posts/vote`, {
          postId: post.id,
          vote,
        });
        afterComment();
        element.target.blur();
      } catch (e) {
        if (e.message) message.error(e.message);
      }
    } else {
      message.info('Você deve se autenticar primeiro.');
    }
  };

  return (
    <Container>
      <Header>
        <h1>{post.description}</h1>
        <p>
          <a href="#">{`${points} Pontos`}</a>
          {' · '}
          <a href="#">{`${post.comments.length} Comentários`}</a>
        </p>
      </Header>
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
          <Dropdown overlay={<MoreActions post={post} />} trigger={['click']}>
            <InteractionButton icon={<DashOutlined />} />
          </Dropdown>
        </section>
      </PostInteractions>
      <PostContainer>
        <img src={post.file.location} alt="Post" />
      </PostContainer>
      <span>
        <a href="#">REPORTAR</a>
      </span>
      <div style={{ width: '100%' }}>
        <CommentsHeader>
          <section>
            <span>{`${post.comments.length} Comentários`}</span>
          </section>
          <section>
            <a
              href="#"
              className={order === 'hot' ? 'active' : ''}
              onClick={e => {
                e.preventDefault();
                setOrder('hot');
              }}
            >
              Em alta
            </a>
            <a
              className={order === 'hot' ? '' : 'active'}
              href="#"
              onClick={e => {
                e.preventDefault();
                setOrder('fresh');
              }}
            >
              Recentes
            </a>
          </section>
        </CommentsHeader>
        <DoComment post={post} afterComment={afterComment} />

        <br />
        <ul>
          {commentData &&
            commentData.comments.map(comment => (
              <Comment
                key={comment.id}
                comment={comment}
                post={post}
                order={order}
                afterComment={afterComment}
                toOpen={commentToOpen}
              />
            ))}
        </ul>
      </div>
      <div />
    </Container>
  );
};

export default Post;
