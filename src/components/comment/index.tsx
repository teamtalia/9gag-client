import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DashOutlined, UserOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { ImArrowDown, ImArrowUp } from 'react-icons/im';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import { mutate } from 'swr';
import TimeAgo from 'react-timeago';
import brStrings from 'react-timeago/lib/language-strings/pt-br-short';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { Dropdown, message } from 'antd';

import { getLocationOrigin } from 'next/dist/next-server/lib/utils';
import Link from 'next/link';
import CommentSchema from '../../schemas/comment';
import {
  Container,
  CommentWrapper,
  CommentAvatar,
  CommentContainer,
  CommentFooter,
  HideReplies,
  RepliesContainer,
  DropdownMenu,
  DropdownMenuItem,
} from './styles';
import { PostInterface } from '../section-post';
import api from '../../services/api';
import DoComment from '../docomment';
import useAuth from '../../hooks/useAuth';

const formatter = buildFormatter(brStrings);

interface CommentProps {
  comment: CommentSchema;
  post: PostInterface;
  order: string;
  afterComment: Function;
  parent?: CommentSchema;
  toOpen?: string;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  post,
  order,
  afterComment,
  parent,
  toOpen,
}) => {
  const [inReply, setInReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const { user } = useAuth();

  const upVotes = useMemo(
    () =>
      comment.meta.filter(e => e.vote === 1).reduce((p, c) => p + c.vote, 0),
    [comment],
  );
  const downVotes = useMemo(
    () =>
      comment.meta
        .filter(e => e.vote === -1)
        .reduce((p, c) => p + c.vote * -1, 0),
    [comment],
  );

  const vote = useCallback(
    async val => {
      try {
        await api.post(`/posts/${post.id}/comments/${comment.id}/meta`, {
          vote: val,
        });
        mutate(`/posts/${post.id}/comments?order=${order}`, data => data, true);
      } catch (e) {
        message.error(e.message);
      }
    },
    [comment, post, order],
  );

  function handleComment() {
    setInReply(false);
    afterComment();
  }

  async function handleRemoveComment() {
    try {
      await api.delete(`/posts/${post.id}/comments/${comment.id}`);
      afterComment();
    } catch (e) {
      message.error(e.message);
    }
  }

  const nestedComments = (comment.replies || []).map(comm => {
    return (
      <Comment
        key={comm.id}
        comment={comm}
        order={order}
        afterComment={afterComment}
        post={post}
        parent={comment}
        toOpen={toOpen}
      />
    );
  });

  const Menu = (
    <DropdownMenu>
      <DropdownMenuItem
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(
              // eslint-disable-next-line prettier/prettier
              `${getLocationOrigin()}/talia/${post.id}#comment_id=${comment.id}`,
            );
            message.success('Link copiado.');
          } catch (err) {
            message.success('Error ao copiar o link.');
          }
        }}
      >
        Copiar link
      </DropdownMenuItem>
      {user?.id === comment.user.id && (
        <DropdownMenuItem onClick={handleRemoveComment}>
          Deletar comentário
        </DropdownMenuItem>
      )}
    </DropdownMenu>
  );

  useLayoutEffect(() => {
    if (toOpen) {
      const inChilds = comment.replies.find(reply => reply.id === toOpen);
      if (inChilds) {
        setShowReplies(true);
      } else if (comment.id === toOpen) {
        if (containerRef.current) {
          containerRef.current.scrollIntoView();
        }
      }
    }
  }, []);
  return (
    <Container ref={containerRef}>
      <CommentWrapper>
        <CommentAvatar>
          <Avatar
            size={64}
            src={comment.user?.avatar?.location}
            icon={<UserOutlined />}
          />
        </CommentAvatar>
        <CommentContainer>
          <header>
            <Link href={`/u/${comment.user.username}`} passHref>
              <a>{`@${comment.user.username}`}</a>
            </Link>
            <a href="#">
              <TimeAgo date={comment.createdAt} formatter={formatter} />
            </a>
          </header>
          <section>
            <div>{comment.text}</div>
            {comment.file && <img src={comment.file.location} alt="fodac" />}
          </section>
          <CommentFooter>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                setInReply(true);
              }}
            >
              Responder
            </a>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                vote(1);
              }}
            >
              <ImArrowUp />
              {` ${upVotes}`}
            </a>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                vote(-1);
              }}
            >
              <ImArrowDown />
              {` ${downVotes}`}
            </a>
            <Dropdown overlay={Menu} trigger={['click']}>
              <a href="#">
                <DashOutlined size={16} />
              </a>
            </Dropdown>
          </CommentFooter>
          {comment.level < 1 && comment.replies.length > 0 && (
            <HideReplies onClick={() => setShowReplies(old => !old)}>
              {showReplies && <TiArrowSortedUp />}
              {!showReplies && <TiArrowSortedDown />}
              <span>
                {`${showReplies ? 'Esconder' : 'Mostrar'}`}
                {` ${comment.replies.length} respostas`}
              </span>
            </HideReplies>
          )}
        </CommentContainer>
      </CommentWrapper>

      {inReply && (
        <DoComment
          post={post}
          onCancel={() => {
            setInReply(false);
          }}
          afterComment={handleComment}
          reply
          comment={parent || comment}
        />
      )}
      {showReplies && <RepliesContainer>{nestedComments}</RepliesContainer>}
    </Container>
  );
};

export default Comment;
