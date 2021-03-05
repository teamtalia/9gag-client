import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  CameraFilled,
  CameraOutlined,
  CloseOutlined,
  LoadingOutlined,
  SmileFilled,
  SmileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, message, Upload } from 'antd';
import { mutate } from 'swr';

import { UploadFile } from 'antd/lib/upload/interface';
import { AiOutlineLoading } from 'react-icons/ai';
import { PostInterface } from '../post';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';
import { baseURL } from '../../config/constants';
import CommentSchema from '../../schemas/comment';
import {
  CommentInput,
  Container,
  AttachmentContainer,
  FooterButton,
} from './styles';

interface DoCommentProps {
  post: PostInterface;
  afterComment: Function;
  onCancel?: Function;
  comment?: CommentSchema;
  reply?: boolean;
}

const DoComment: React.FC<DoCommentProps> = ({
  post,
  onCancel,
  afterComment,
  comment,
  reply = false,
}) => {
  const { token } = useAuth();

  const [inUpload, setInUpload] = useState(false);
  const [uploadImage, setUploadImage] = useState<UploadFile>(null);
  const [stage, setStage] = useState(0);
  const [text, setText] = useState(reply ? `@${comment.user.fullname} ` : '');
  const [link, setLink] = useState('');
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const [pending, setPending] = useState(false);

  function handleReset() {
    setText('');
    setLink('');
    setInUpload(false);
    setStage(0);
    setUploadImage(null);
  }

  async function handleComment() {
    if (pending) return;
    setPending(true);
    if (text === '' && stage === 0) {
      message.error('O campo não pode estar vazio.');
      setPending(false);
      return;
    }
    if (stage === 1 && link === '') {
      message.error('Você deve informar um link');
      setPending(false);
      // validar o link
      return;
    }
    let fileId = uploadImage ? uploadImage.response.id : null;
    if (stage === 1) {
      try {
        const { data } = await api.post<{
          location: string;
          name: string;
          id: string;
        }>('/files/external', {
          url: link,
        });
        fileId = data.id;
      } catch (e) {
        message.error(e);
        setPending(false);
        return;
      }
    }
    try {
      await api.post(
        `/posts/${post.id}/comments${reply ? `/${comment.id}` : ''}`,
        {
          text,
          fileId,
        },
      );
      setPending(false);
      afterComment();
      handleReset();
    } catch (e) {
      message.error(e.message);
      setPending(false);
    }
  }

  function handleMakeMeme(e) {
    e.preventDefault();
    handleReset();
    setStage(1);
  }

  async function handleRemoveFile(e) {
    e.preventDefault();
    if (inUpload && uploadImage) {
      try {
        await api.delete(`/files/${uploadImage.response.id}`);
        setUploadImage(null);
        setInUpload(false);
      } catch (err) {
        console.log(err);
      }
    }
  }

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

  const uploadProps = useMemo(
    () => ({
      name: 'file',
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
      },
      showUploadList: false,

      multiple: false,
      beforeUpload,
    }),
    [token],
  );

  const steps = useMemo(() => {
    const val = text.length / 134;
    const strides = val >= 1.5 ? Math.ceil(val) : Math.floor(val);
    return strides > 4 ? 4 : strides;
  }, [text]);

  useEffect(() => {
    if (commentInputRef.current) {
      const Input = commentInputRef.current;
      Input.focus();
      Input.selectionStart += Input.value.length;
      Input.selectionEnd = Input.selectionEnd + Input.value.length + 1;
    }
  }, []);

  return (
    <Container>
      <section>
        <Avatar size={64} icon={<UserOutlined />} />
      </section>
      <section style={{ flex: 1 }}>
        <header>
          {stage === 0 && (
            <>
              <CommentInput
                onChange={e => {
                  const { value } = e.target;
                  setText(value);
                }}
                value={text}
                placeholder="Escreva um comentário..."
                ref={commentInputRef}
                steps={steps}
              />
              {inUpload && (
                <AttachmentContainer>
                  <figure>
                    {!uploadImage && (
                      <AiOutlineLoading className="spin" size={22} />
                    )}
                    {uploadImage && (
                      <img src={uploadImage.response.location} alt="Post" />
                    )}
                    <a href="#" onClick={handleRemoveFile}>
                      <CloseOutlined />
                    </a>
                  </figure>
                </AttachmentContainer>
              )}
            </>
          )}
          {stage === 1 && (
            <CommentInput
              onChange={e => {
                const { value } = e.target;
                setLink(value);
              }}
              value={link}
              placeholder="Cole o link do Memeful URL..."
            />
          )}
        </header>
        <footer>
          <div>
            {stage === 0 && (
              <>
                <Upload {...uploadProps}>
                  <FooterButton
                    icon={<CameraFilled style={{ fontSize: 22 }} />}
                  />
                </Upload>
                <FooterButton
                  icon={<SmileOutlined style={{ fontSize: 22 }} />}
                  onClick={handleMakeMeme}
                />
              </>
            )}
            {stage === 1 && (
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handleReset();
                }}
                style={{ marginRight: 10 }}
              >
                Cancelar
              </a>
            )}
          </div>
          <div>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                handleReset();
                if (onCancel) onCancel();
              }}
              style={{ marginRight: 10 }}
            >
              Cancelar
            </a>
            <Button type="primary" onClick={handleComment}>
              {pending && <LoadingOutlined />}
              {pending ? ' Publicando' : ' Publicar'}
            </Button>
          </div>
        </footer>
      </section>
    </Container>
  );
};

export default DoComment;
