import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Upload as UploadAntd, message, Button, Popover } from 'antd';
import Select, { OptionsType } from 'react-select';
import { DraggerProps } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { mutate } from 'swr';

import { IoMdImage } from 'react-icons/io';
import { ThemeContext } from 'styled-components';
import { BsUpload } from 'react-icons/bs';
import { AiFillEdit, AiFillPlayCircle, AiOutlineLoading } from 'react-icons/ai';

import { ModalStateProps } from '../navbar';
import { Container, UploadSection, Wrapper, Row, PostSection } from './styles';
import { baseURL, MOBILE_APP_URL } from '../../config/constants';
import AuthContext from '../../contexts/AuthContext';

import 'antd/dist/antd.css';
import useFetch from '../../hooks/useFetch';
import api from '../../services/api';

interface ModalProps {
  setModalState: any;
  modalState: ModalStateProps;
}
interface UploadProps {
  modal: ModalProps;
}
interface TagsResponse {
  tags: any[];
}

const Upload: React.FC<UploadProps> = ({
  modal: { modalState, setModalState },
}) => {
  const { Dragger } = UploadAntd;
  const theme = useContext(ThemeContext);
  const [stage, setStage] = useState(0);
  const [sensitive, setSensitive] = useState(false);
  const [isAttributed, setIsAttributed] = useState(false);
  const [originalPoster, setOriginalPoster] = useState('');
  const [inUpload, setInUpload] = useState(false);
  const [uploadImage, setUploadImage] = useState<UploadFile>(null);
  const MAX_CHARACTERS = 280;
  const [countCharacters, setCountCharaters] = useState(0);
  const [description, setDescription] = useState('');
  const [inputTags, setInputTags] = useState<
    OptionsType<{
      label: any;
      value: any;
    }>
  >();
  const { token } = useContext(AuthContext);

  const { data: tagsData, error } = useFetch<TagsResponse>('/tags', api, {});

  const tags = useMemo(() => {
    if (!tagsData) {
      return [];
    }
    return tagsData.tags.map(tag => ({
      label: tag.name,
      value: tag.name,
    }));
  }, [tagsData]);

  function beforeUpload(file, FileList): boolean {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    setInUpload(isJpgOrPng && isLt2M);
    return isJpgOrPng && isLt2M;
  }

  const handleUpload = async () => {
    if (typeof inputTags === 'undefined' || !inputTags.length) {
      message.error('The post must contain at least one tag');
      return;
    }
    if (!uploadImage) return;

    try {
      const { data: newPost } = await api.post(
        '/posts',
        {
          tags: inputTags.map(el => el.value),
          sensitive,
          originalPoster,
          file: uploadImage.response.id,
          description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      mutate(
        '/posts',
        posts => {
          const newPosts = [...posts.posts, newPost];
          return { posts: newPosts };
        },
        true,
      );
      setModalState(mState => ({
        ...mState,
        visible: false,
      }));
    } catch (err) {
      console.log('erro', error);
    }
  };

  const uploadOptions: DraggerProps = {
    beforeUpload,
    name: 'file',
    multiple: false,
    action: `${baseURL}/files`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    onChange: info => {
      switch (info.file.status) {
        case 'done':
          setUploadImage(info.file);
          break;
        case 'error':
          setUploadImage(null);
          setInUpload(false);
          message.error('Ops! Error on upload image');
          break;
        default:
          break;
      }

      console.log(info);
    },
    showUploadList: false,
  };

  useEffect(() => {
    console.log(inputTags);
  }, [inputTags]);

  return (
    <Container>
      {stage === 0 && (
        <Wrapper>
          <h3>
            {inUpload ? 'Dê um título à sua postagem' : 'Carregar uma postagem'}
          </h3>
          <span>
            {inUpload
              ? 'Um título preciso e descritivo pode ajudar as pessoas a descobrirem sua postagem.'
              : 'Escolha como deseja fazer o upload da postagem'}
          </span>
          <UploadSection disableHover={inUpload}>
            <div style={{ display: inUpload ? 'none' : 'block' }}>
              <Dragger {...uploadOptions}>
                <p className="ant-upload-drag-icon">
                  <BsUpload size={48} />
                </p>
                <p className="ant-upload-text">
                  Solte a imagem para fazer o envio ou
                </p>
                <p className="ant-upload-hint">
                  <Button type="primary">Escolher os arquivos...</Button>
                </p>
              </Dragger>
            </div>
            {inUpload && (
              <>
                <PostSection>
                  <figure>
                    {!uploadImage && (
                      <AiOutlineLoading
                        className="spin"
                        style={{ margin: 20 }}
                        size={48}
                      />
                    )}
                    {uploadImage && (
                      <img src={uploadImage.response.location} alt="Post" />
                    )}
                  </figure>
                  <div>
                    <textarea
                      placeholder="Describe your post..."
                      onChange={e => {
                        setCountCharaters(e.target.value.length);
                        setDescription(e.target.value);
                      }}
                      maxLength={MAX_CHARACTERS}
                    />
                    <span>{MAX_CHARACTERS - countCharacters}</span>
                  </div>
                </PostSection>
                <PostSection>
                  <span>Tag</span>
                  <span style={{ flex: 1, flexShrink: 0 }}>
                    <Select
                      options={tags}
                      isMulti
                      classNamePrefix="select"
                      placeholder="tag1, tag2, tag3"
                      styles={{
                        menu: (props, element) => {
                          return {
                            ...props,
                            color: 'black',
                          };
                        },
                      }}
                      onChange={values => setInputTags(values)}
                    />
                  </span>
                </PostSection>
                <PostSection>
                  <span>Isso é sensível</span>
                  <input
                    type="checkbox"
                    onChange={() => setSensitive(b => !b)}
                  />
                </PostSection>
                <PostSection>
                  <span>Atribuir postagem original</span>
                  <input
                    type="checkbox"
                    onChange={() => setIsAttributed(b => !b)}
                  />
                </PostSection>
                {isAttributed && (
                  <PostSection>
                    <input
                      type="text"
                      placeholder="http://"
                      onChange={e => setOriginalPoster(e.target.value)}
                    />
                  </PostSection>
                )}
              </>
            )}
          </UploadSection>
          {inUpload && (
            <Row style={{ justifyContent: 'flex-end' }}>
              <Button
                onClick={() => {
                  setInUpload(false);
                  // reset
                }}
              >
                Voltar
              </Button>
              <Button type="primary" onClick={handleUpload}>
                Avançar
              </Button>
            </Row>
          )}
          {!inUpload && (
            <Row>
              <UploadSection>
                <IoMdImage size={42} />
                <span>Colar URL da imagem</span>
              </UploadSection>
              <Popover
                content={<div>Disponivel no iOS &#38; Android apenas.</div>}
                style={{
                  backgroundColor: theme.primaryColor,
                  color: theme.primaryTextColor,
                }}
              >
                <UploadSection
                  onClick={() => {
                    window.open(MOBILE_APP_URL, '_blank');
                  }}
                >
                  <AiFillPlayCircle size={42} />
                  <span>Colar URL do vídeo</span>
                </UploadSection>
              </Popover>
              <UploadSection
                onClick={() => {
                  window.open(
                    'https://memeful.com/generator?ref=talia',
                    '_blank',
                  );
                }}
              >
                <AiFillEdit size={42} />
                <span>Fazer um Meme</span>
              </UploadSection>
            </Row>
          )}
        </Wrapper>
      )}
    </Container>
  );
};

export default Upload;
