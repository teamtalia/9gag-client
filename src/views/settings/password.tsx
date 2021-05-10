import React, { useRef, useState } from 'react';
import { Button, Form, message } from 'antd';
import { useRouter } from 'next/router';
import { Container, Page } from '../../components/layout';
import NavBar from '../../components/navbar';
import SideBar from '../../components/sidebar';
import Suggestions from '../../components/suggestions';
import Menu from './menu';
import { Wrapper, Content, Input } from './styles';
import useAuth from '../../hooks/useAuth';
import api from '../../services/api';

const PasswordView: React.FC = () => {
  const formRef = useRef();
  const router = useRouter();
  const { signed, user } = useAuth();

  async function handleChangePassword(values) {
    try {
      await api.put(`/users/${user.username}/password`, { ...values });
      message.success('Senha atualizada com sucesso!');
    } catch (e) {
      const { message: errorMessage } = e.response.data;
      message.error(`Oops! ${errorMessage}`);
    }
  }

  if (!signed) {
    router.push('/');
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
              <h2>Senha</h2>
              <Form
                ref={formRef}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                onFinish={handleChangePassword}
              >
                <Form.Item name="oldPassword" label="Senha Atual">
                  <Input type="password" />
                </Form.Item>
                <Form.Item name="password" label="Nova Senha">
                  <Input type="password" />
                </Form.Item>
                <footer>
                  <Button type="primary" htmlType="submit">
                    Trocar Senha
                  </Button>
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

export default PasswordView;
