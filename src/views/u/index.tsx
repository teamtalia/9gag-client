/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Dropdown, Menu } from 'antd';
import { getLocationOrigin } from 'next/dist/next-server/lib/utils';
import React, { useState } from 'react';
import { AiOutlineDash } from 'react-icons/ai';
import { Container, Page } from '../../components/layout';
import NavBar from '../../components/navbar';
import SEO from '../../components/seo';
import SideBar from '../../components/sidebar';
import Suggestions from '../../components/suggestions';
import {
  Header,
  Wrapper,
  TabBar,
  MoreActionsContainer,
  MoreActionsItem,
} from './styles';

// import { Container } from './styles';
interface UserViewProps {
  username: string;
}

const UserView: React.FC<UserViewProps> = ({ username }) => {
  const user = {
    username: 'username',
    avatar: {
      location: 'https://accounts-cdn.9gag.com/media/avatar/57982524_100_1.jpg',
    },
  };

  const [page, setPage] = useState(0);
  const moreOptions = () => (
    <MoreActionsContainer>
      <MoreActionsItem key="1">Copiar link</MoreActionsItem>
      <MoreActionsItem key="2">Bloquear @thayllordossan</MoreActionsItem>
      <MoreActionsItem key="3">Reportar @thayllordossan</MoreActionsItem>
    </MoreActionsContainer>
  );

  const activeClassHandle = id => (id === page ? 'active' : '');

  return (
    <>
      <SEO
        description="Θαλία-  divirta-se vendo memes"
        title={`${user.username} - Θαλία`}
        image={user.avatar.location}
        url={`${getLocationOrigin()}/u/${user.username}`}
      />
      <NavBar />
      <Container>
        <SideBar />
        <Page>
          <Wrapper>
            <Header>
              <img src={user.avatar.location} alt="foto de perfil" />
              <header>
                <h2>Thayllor Dos Santos</h2>
                <p>
                  @thayllordossan
                  <span>. 169days</span>
                </p>
              </header>
            </Header>

            <section>My Funny Collection</section>
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
                <li className={activeClassHandle(3)} onClick={e => setPage(3)}>
                  Curtidos
                </li>
              </ul>
              <Dropdown trigger={['click']} overlay={moreOptions}>
                <a>
                  <AiOutlineDash size={25} />
                </a>
              </Dropdown>
            </TabBar>
          </Wrapper>
          <Suggestions />
        </Page>
      </Container>
    </>
  );
};

export default UserView;
