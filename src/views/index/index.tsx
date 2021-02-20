import React from 'react';
import Feed from '../../components/feed';
import NavBar from '../../components/navbar';
import SideBar from '../../components/sidebar';
import Suggestions from '../../components/suggestions';

import { Container, Page } from './styles';

const Index: React.FC = () => {
  return (
    <>
      <NavBar />
      <Container>
        <SideBar />
        <Page>
          <Feed />
          <Suggestions />
        </Page>
      </Container>
    </>
  );
};

export default Index;
