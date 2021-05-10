/* eslint-disable react/jsx-indent */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Button, Dropdown, Menu, message } from 'antd';
import { getLocationOrigin } from 'next/dist/next-server/lib/utils';
import React, { useEffect, useState } from 'react';
import { AiOutlineDash } from 'react-icons/ai';
import TimeAgo from 'react-timeago';
import brStrings from 'react-timeago/lib/language-strings/pt-br';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined } from '@ant-design/icons';
import { Container, Page } from '../../components/layout';
import NavBar from '../../components/navbar';
import SEO from '../../components/seo';
import SideBar from '../../components/sidebar';
import Suggestions from '../../components/suggestions';
import UserSchema from '../../schemas/user';
import {
  Header,
  Wrapper,
  TabBar,
  MoreActionsContainer,
  MoreActionsItem,
  BlankState,
} from './styles';
import useFetch from '../../hooks/useFetch';
import api from '../../services/api';
import Feed from '../../components/feed';
import useAuth from '../../hooks/useAuth';

// import { Container } from './styles';
interface UserViewProps {
  user: UserSchema;
}
// home, postagens, comentarios, curtidos
const endpoints = ['', 'my', 'comments', 'upvotes'];

const formatter = buildFormatter(brStrings);

const UserView: React.FC<UserViewProps> = ({ user }) => {
  const [page, setPage] = useState(0);

  const { user: { username } } = useAuth()
  const { data } = useFetch<{ posts: any[] }>(
    `/perfil/${user.username}/posts/${endpoints[page]}`,
    api,
    {},
  );

  const isMe = username === user.username

  const moreOptions = () => (
    <MoreActionsContainer>
      <MoreActionsItem
        key="1"
        onClick={async e => {
          await navigator.clipboard.writeText(`${getLocationOrigin()}/u/${user.username}`);
          message.success("Copiado para áre de transferência.")
        }}
      >
        Copiar link

      </MoreActionsItem>
      <MoreActionsItem key="2">{`Bloquear @${user.username}`}</MoreActionsItem>
      <MoreActionsItem key="3">{`Reportar @${user.username}`}</MoreActionsItem>
    </MoreActionsContainer>
  );

  const activeClassHandle = id => (id === page ? 'active' : '');

  return (
    <>
      <SEO
        description="Θαλία-  divirta-se vendo memes"
        title={`${user.username} - Θαλία`}
        image={user.avatar?.location}
        url={`${getLocationOrigin()}/u/${user.username}`}
      />
      <NavBar />
      <Container>
        <SideBar />
        <Page>
          <Wrapper>
            <Header>
              <figure>
                {!user.avatar && <Avatar size={80} icon={<UserOutlined />} />}
                {user.avatar && (
                  <img src={user.avatar.location} alt="foto de perfil" />
                )}
              </figure>

              <header>
                <h2 style={{ textTransform: 'capitalize' }}>{user.fullname}</h2>
                <p>
                  {`@${user.username}`}
                  <span>
                    {` · `}
                    <TimeAgo date={user.createdAt} formatter={formatter} />
                  </span>
                </p>
              </header>
            </Header>
            <section>{user.about}</section>
            <TabBar>
              <ul>
                <li className={activeClassHandle(0)} onClick={e => setPage(0)}>
                  Inicio
                </li>
                <li className={activeClassHandle(1)} onClick={e => setPage(1)}>
                  Postagens
                </li>
                <li className={activeClassHandle(2)} onClick={e => setPage(2)}>
                  Comentados
                </li>
                {isMe && (
                  <li className={activeClassHandle(3)} onClick={e => setPage(3)}>
                    Curtidos
                  </li>
                )}
              </ul>
              <Dropdown trigger={['click']} overlay={moreOptions}>
                <a>
                  <AiOutlineDash size={25} />
                </a>
              </Dropdown>
            </TabBar>
            {data && data.posts && data.posts.length ? (
              <Feed posts={data.posts} />
            ) : (
                <BlankState>
                  <h3>Nenhuma publicação para mostrar</h3>
                  {page === 1 && isMe && (
                    <Button type="primary">
                      Criar Publicação
                    </Button>
                  )}
                </BlankState>
              )}
          </Wrapper>
          <Suggestions />
        </Page>
      </Container>
    </>
  );
};

export default UserView;
