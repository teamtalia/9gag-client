import { Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useContext, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsMoon, BsSearch } from 'react-icons/bs';
import { MdChatBubble } from 'react-icons/md';
import { ThemeContext } from 'styled-components';
import AppContext from '../../contexts/AppContext';
import Login from '../login';
import Signup from '../signup';
import { Container, SetupNav, NavOption, NavRightContainer } from './styles';

interface FakeCategories {
  name: string;
  icon?: any;
  notify?: boolean;
}
const categories: FakeCategories[] = [
  {
    name: 'Among Us',
  },
  {
    name: 'Shower Thoughts',
    notify: true,
  },
  {
    name: 'Motorbike',
    notify: true,
  },
  {
    name: 'Feels Bar',
  },
];

export interface ModalStateProps {
  visible: boolean;
  title: string;
  component: any;
}

const NavBar: React.FC = () => {
  const theme = useContext(ThemeContext);
  const { setTheme } = useContext(AppContext);
  const [modalState, setModalState] = useState<ModalStateProps>({
    visible: false,
    title: null,
    component: null,
  });

  const handleOpenSignUp = e => {
    e.preventDefault();
    setModalState(state => ({
      ...state,
      visible: true,
      component: (mState, setMState) => (
        <Signup
          modal={{
            modalState: mState,
            setModalState: setMState,
          }}
        />
      ),
    }));
  };

  const handleOpenLogin = e => {
    e.preventDefault();
    setModalState(state => ({
      ...state,
      visible: true,
      component: () => <Login />,
    }));
  };

  return (
    <>
      <Container>
        <SetupNav />
        <h1>Θαλία</h1>
        <ul>
          <NavOption>
            <span role="img" aria-label="Shuffle">
              🔀
            </span>
            Shuffle
          </NavOption>
          <NavOption>
            <span role="img" aria-label="Mobile App">
              📱
            </span>
            Get App
          </NavOption>
          <NavOption>
            <span role="img" aria-label="Mobile App">
              🛒
            </span>
            Shop
          </NavOption>
          {categories.map(category => (
            <NavOption key={category.name} notify={category.notify}>
              {category.icon && (
                <span role="img" aria-label="Mobile App">
                  {category.icon}
                </span>
              )}
              {category.name}
            </NavOption>
          ))}
          <NavRightContainer>
            <NavOption
              onlyIcon
              onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
            >
              <BsMoon
                size={18}
                color={theme.name === 'dark' ? 'yellow' : 'white'}
              />
            </NavOption>
            <NavOption onlyIcon gray>
              <BsSearch size={18} />
            </NavOption>
            <NavOption onlyIcon gray>
              <MdChatBubble size={18} />
            </NavOption>
            <NavOption gray onClick={handleOpenLogin}>
              Log in
            </NavOption>
            <Button
              type="primary"
              style={{
                padding: '0 17px',
                height: '27px',
                marginLeft: '12px',
              }}
              onClick={handleOpenSignUp}
            >
              Sign Up
            </Button>
          </NavRightContainer>
        </ul>
      </Container>
      <Modal
        visible={modalState.visible}
        title={modalState.title}
        onCancel={e => {
          setModalState(state => ({ ...state, visible: false }));
        }}
        footer={null}
        bodyStyle={{
          height: 'auto',
          backgroundColor: theme.primaryColor,
          color: theme.primaryTextColor,
          padding: 24,
        }}
        closeIcon={<AiOutlineClose color={theme.primaryTextColor} />}
        destroyOnClose
      >
        {modalState.component &&
          modalState.component(modalState, setModalState)}
      </Modal>
    </>
  );
};

export default NavBar;
