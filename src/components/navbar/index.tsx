import React, { useContext, useMemo, useState } from 'react';
import { Button, Avatar, Modal, Dropdown, message } from 'antd';
import { AiOutlineClose } from 'react-icons/ai';
import { BsMoon, BsSearch } from 'react-icons/bs';
import { BiPlusMedical } from 'react-icons/bi';
import { MdChatBubble } from 'react-icons/md';
import { ThemeContext } from 'styled-components';
import { UserOutlined } from '@ant-design/icons';

import Link from 'next/link';
import { getLocationOrigin } from 'next/dist/next-server/lib/utils';
import { useRouter } from 'next/router';
import AppContext from '../../contexts/AppContext';
import useAuth from '../../hooks/useAuth';
import Login from '../login';
import Signup from '../signup';
import Upload from '../upload';
import {
  Container,
  SetupNav,
  NavOption,
  NavRightContainer,
  Wrapper,
} from './styles';
import useFetch from '../../hooks/useFetch';
import UserSchema from '../../schemas/user';
import api from '../../services/api';
import { DropdownMenu, DropdownMenuItem } from '../sidebar/styles';
import PostSchema from '../../schemas/post';

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
    name: 'Banho de Pensamentos',
    notify: true,
  },
  {
    name: 'Moto',
    notify: true,
  },
  {
    name: 'Conversa de Bar',
  },
];

export interface ModalStateProps {
  visible: boolean;
  title: string;
  component: any;
}

type CategoriesData = {
  id: string;
  name: string;
  slug: string;
  posts: number;
  tags: {
    name: string;
    id: string;
    slug: string;
  }[];
};
interface CategoriesPayload {
  categories: CategoriesData[];
}

const NavBar: React.FC = () => {
  const theme = useContext(ThemeContext);
  const { setTheme } = useContext(AppContext);
  const [modalState, setModalState] = useState<ModalStateProps>({
    visible: false,
    title: null,
    component: null,
  });
  const { signed, signOut, user: User } = useAuth();
  const router = useRouter();

  const { data: user } = useFetch<UserSchema>(
    User ? `/users/${User.username}` : null,
    api,
    {},
  );

  const { data: dataCategories } = useFetch<CategoriesPayload>(
    '/categories',
    api,
    {},
  );

  const tags = useMemo(() => {
    if (dataCategories && dataCategories.categories) {
      const featured = dataCategories.categories.slice(0, 2);
      return featured.reduce(
        (prev, curr) => [...prev, ...(curr.tags?.slice(0, 2) || [])],
        [],
      );
    }
    return [];
  }, [dataCategories]);

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
      component: (mState, setMState) => (
        <Login
          modal={{
            modalState,
            setModalState: setMState,
          }}
        />
      ),
    }));
  };

  const handleOpenUpload = e => {
    e.preventDefault();
    setModalState(state => ({
      ...state,
      visible: true,
      component: (mState, setMState) => (
        <Upload
          modal={{
            modalState,
            setModalState: setMState,
          }}
        />
      ),
    }));
  };

  async function handleLogout() {
    await signOut();
  }

  async function handleShuffle() {
    try {
      const { data } = await api.get<PostSchema>('/posts/shuffle');
      router.push(`/talia/${data.id}`);
    } catch (e) {
      const { message: messageError } = e.response.data;
      message.error(`Oops! ${messageError}`);
    }
  }

  const MenuAvatar = (
    <DropdownMenu>
      <DropdownMenuItem>
        <Link href={`${getLocationOrigin()}/u/${user?.username}`}>
          Meu Perfil
        </Link>
        <Link href="/settings">Configurações</Link>
      </DropdownMenuItem>
    </DropdownMenu>
  );

  return (
    <Wrapper>
      <Container>
        <SetupNav />
        <Link href="/">
          <h1>ταλία</h1>
        </Link>

        <ul>
          <NavOption onClick={handleShuffle}>
            <span role="img" aria-label="Shuffle">
              🔀
            </span>
            Aleatório
          </NavOption>
          <NavOption>
            <span role="img" aria-label="Mobile App">
              📱
            </span>
            Baixe o App
          </NavOption>
          {tags.map(tag => (
            <NavOption key={tag.name} notify={false}>
              {tag.name}
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
            {!signed && (
              <NavOption gray onClick={handleOpenLogin}>
                Entrar
              </NavOption>
            )}
            {signed && (
              <>
                <NavOption gray>
                  <Dropdown overlay={MenuAvatar} trigger={['click']}>
                    <Avatar
                      size={28}
                      icon={<UserOutlined />}
                      src={user?.avatar?.location}
                    />
                  </Dropdown>
                  {/* xd */}
                </NavOption>
                <Button
                  type="primary"
                  style={{
                    padding: '0 17px',
                    height: '27px',
                    marginLeft: '12px',
                  }}
                  onClick={handleOpenUpload}
                >
                  <BiPlusMedical
                    color="white"
                    size={12}
                    style={{ marginRight: 5 }}
                  />
                  Envio
                </Button>
                <NavOption gray onClick={handleLogout}>
                  Sair
                </NavOption>
              </>
            )}
            {!signed && (
              <Button
                type="primary"
                style={{
                  padding: '0 17px',
                  height: '27px',
                  marginLeft: '12px',
                }}
                onClick={handleOpenSignUp}
              >
                Inscreva-se
              </Button>
            )}
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
    </Wrapper>
  );
};

export default NavBar;
