import React, { useRef, useState } from 'react';
import { Button, Form, message } from 'antd';
import { useRouter } from 'next/router';
import { Container, Page } from '../../components/layout';
import NavBar from '../../components/navbar';
import SideBar from '../../components/sidebar';
import Suggestions from '../../components/suggestions';
import Menu from './menu';
import { Wrapper, Content, Input, Select, Option } from './styles';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import api from '../../services/api';

const AccountView: React.FC = () => {
  const formRef = useRef();
  const router = useRouter();
  const { user, signed, revalidateUser } = useAuth();
  const { data } = useFetch(user ? `/users/${user.username}` : null, api, {});

  const [username, setUsername] = useState(user ? user.username : null);
  const [email, setEmail] = useState(user ? user.email : null);

  if (!signed) {
    router.push('/');
  }

  async function handleUpdateAccount(values) {
    try {
      await api.put(`/users/${user.username}/account`, { ...values });
      message.success('Informações Atualizadas com sucesso!');
      revalidateUser();
    } catch (e) {
      const { message: messageError } = e.response.data;
      message.error(`Oops! ${messageError}`);
    }
  }

  if (!user || !data) {
    return <div />;
  }

  return (
    <>
      <NavBar />
      <Container>
        <SideBar />
        <Page>
          <Wrapper>
            <Menu />
            <Content>
              <h2>Conta</h2>
              <Form
                ref={formRef}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                onFinish={handleUpdateAccount}
              >
                <Form.Item
                  name="newUsername"
                  label="Usuário"
                  initialValue={user.username}
                >
                  <Input
                    value={username}
                    placeholder={user.username}
                    onChange={e => {
                      const value = e.target.value.replace(/[^\w]/gi, '');
                      if (value.length < 1 || value === ' ') {
                        setUsername(user.username);
                      } else {
                        setUsername(value);
                      }
                    }} // melhorar pra caralho isso (debounce e defaults)
                  />
                </Form.Item>
                <span>
                  https://9gag.com/u/
                  {username}
                </span>
                <div style={{ marginTop: '25px' }} />
                <Form.Item
                  name="email"
                  label="E-mail"
                  initialValue={user.email}
                >
                  <Input
                    value={email}
                    disabled
                    onChange={e => setUsername(e.target.value)} // melhorar pra caralho isso (debounce e defaults)
                  />
                </Form.Item>
                <span>O e-mail não será exibido publicamente</span>
                <div style={{ marginTop: '25px' }} />
                <Form.Item
                  name="mask_sensitive"
                  label="Máscara de conteúdo sensível"
                  initialValue={1}
                >
                  <Select>
                    <Option value={1}>Sim</Option>
                    <Option value={0}>Não</Option>
                  </Select>
                </Form.Item>
                <div style={{ marginTop: '25px' }} />
                <Form.Item
                  name="sensitive"
                  label="Mostrar conteúdo sensível"
                  initialValue={1}
                >
                  <Select>
                    <Option value={1}>Sim</Option>
                    <Option value={0}>Não</Option>
                  </Select>
                </Form.Item>

                <footer>
                  <Button type="primary" htmlType="submit">
                    Salvar mudanças
                  </Button>
                  {/* <a href="#">Deletar conta</a> */}
                </footer>
              </Form>
            </Content>
          </Wrapper>
          <Suggestions />
        </Page>
      </Container>
    </>
  );
};

export default AccountView;
