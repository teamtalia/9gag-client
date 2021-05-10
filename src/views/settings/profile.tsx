/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useMemo, useRef, useState } from 'react';
import { Button, Form, Avatar, Upload, message } from 'antd';
import { useRouter } from 'next/router';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { Container, Page } from '../../components/layout';
import NavBar from '../../components/navbar';
import SideBar from '../../components/sidebar';
import Suggestions from '../../components/suggestions';
import Menu from './menu';
import {
  Wrapper,
  Content,
  Input,
  TextArea,
  DatePicker,
  AvatarSection,
} from './styles';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import api from '../../services/api';
import UserSchema from '../../schemas/user';
import { baseURL } from '../../config/constants';
import AuthContext from '../../contexts/AuthContext';

const ProfileView: React.FC = () => {
  const formRef = useRef();
  const router = useRouter();
  const { user, signed } = useAuth();
  const { data } = useFetch<UserSchema>(
    user ? `/users/${user.username}` : null,
    api,
    {},
  );
  const { token } = useContext(AuthContext);

  const [uploadImage, setUploadImage] = useState<UploadFile>(null);

  const [pending, setPeding] = useState(false);

  function beforeUpload(file, FileList): boolean {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Você só pode fazer upload de arquivos JPG / PNG !!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('A imagem deve ser menor que 2 MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const uploadProps: UploadProps = useMemo(
    () => ({
      beforeUpload,
      name: 'file',
      multiple: false,
      action: `${baseURL}/files`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      showUploadList: false,
      onChange: info => {
        switch (info.file.status) {
          case 'done':
            setUploadImage(info.file);
            break;
          case 'error':
            setUploadImage(null);
            message.error('Ops! Erro no upload da imagem');
            break;
          default:
            break;
        }
      },
    }),
    [token],
  );

  async function handleUpdateProfile(values) {
    console.log(values);
    try {
      await api.put(`/users/${user.username}/profile`, {
        ...values,
        fileId: uploadImage ? uploadImage.response.id : null,
      });
      // fazer o upload das infos
      message.success('Informações atualizadas com sucesso!');
    } catch (e) {
      message.error(
        'Oops! Erro ao atualizar suas informações: ',
        e.message || e,
      );
    }
  }

  if (!signed) {
    router.push('/');
  }
  if (!user || !data) {
    return <div />;
  }

  console.log(data.about);

  return (
    <>
      <NavBar />
      <Container>
        <SideBar />
        <Page>
          <Wrapper>
            <Menu />
            <Content>
              <h2>Perfil</h2>
              <Form
                ref={formRef}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                onFinish={handleUpdateProfile}
              >
                <AvatarSection>
                  <label>Avatar</label>
                  <div>
                    <Avatar
                      size={98}
                      icon={<UserOutlined />}
                      src={
                        uploadImage
                          ? uploadImage.response.location
                          : data?.avatar.location
                      }
                    />
                    <div>
                      <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>Enviar Avatar</Button>
                      </Upload>
                      <p>JPG ou PNG, tamanho Máximo: 2MB</p>
                    </div>
                  </div>
                </AvatarSection>

                <Form.Item
                  name="fullname"
                  label="Nome de exibição"
                  initialValue={user.fullname}
                  required
                  requiredMark="optional"
                >
                  <Input />
                </Form.Item>
                <div style={{ marginTop: '25px' }} />
                <Form.Item name="age" label="Idade" initialValue={data.age}>
                  <Input type="number" min="13" maxLength={2} />
                </Form.Item>
                <div style={{ marginTop: '25px' }} />
                <Form.Item
                  name="about"
                  label="Sobre"
                  initialValue={data.about}
                  required
                  requiredMark="optional"
                >
                  <TextArea />
                </Form.Item>
                <div style={{ marginTop: '25px' }} />

                <footer>
                  <Button type="primary" htmlType="submit" loading={pending}>
                    Salvar mudanças
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

export default ProfileView;
