import { getLocationOrigin } from 'next/dist/next-server/lib/utils';
import React from 'react';
import { Container, Page } from '../../components/layout';
import NavBar from '../../components/navbar';
import SEO from '../../components/seo';
import SideBar from '../../components/sidebar';
import Suggestions from '../../components/suggestions';
import { Header, Wrapper } from './styles';

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
            </Header>
            {username}
          </Wrapper>
          <Suggestions />
        </Page>
      </Container>
    </>
  );
};

export default UserView;
