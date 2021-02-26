import { message } from 'antd';
import React, { useState } from 'react';

import GoogleLogin from 'react-google-login';
import { AiFillApple, AiFillFacebook, AiOutlineLoading } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { SiGoogleplay } from 'react-icons/si';
import { clientId } from '../../config/google';
import useAuth from '../../hooks/useAuth';
import { ModalStateProps } from '../navbar';
import {
  DivApp,
  Container,
  BotaoLogin,
  BotaoG,
  BotaoFB,
  DivInput,
  DivBotoes,
} from './styles';

interface ModalProps {
  setModalState: any;
  modalState: ModalStateProps;
}
interface LoginProps {
  modal: ModalProps;
}

const Login: React.FC<LoginProps> = ({
  modal: { modalState, setModalState },
}) => {
  const { signIn, pending, sendResetPassword, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [code, setCode] = useState('');
  const [stage, setStage] = useState(0);
  async function handleGoogleSignIn(res) {
    const thirdPartyToken = res.getAuthResponse().id_token;

    const err = await signIn({ thirdPartyToken });
    if (!err) {
      setModalState(mState => ({
        ...mState,
        visible: false,
      }));
    } else {
      message.error(err);
    }
  }
  async function handleLogin() {
    if (email && password) {
      const err = await signIn({ email, password });
      if (!err) {
        setModalState(mState => ({
          ...mState,
          visible: false,
        }));
      } else {
        message.error(err);
      }
    }
  }

  async function handleForgot() {
    if (email) {
      const err = await sendResetPassword({ email });
      if (!err) {
        setStage(2);
      } else {
        message.error(err);
      }
    }
  }

  async function handleReset() {
    if (code && password && passwordConfirm) {
      const { error, message: resetMessage } = await resetPassword({
        code,
        password,
        passwordConfirm,
      });
      if (!error) {
        setModalState(mState => ({
          ...mState,
          visible: false,
        }));
        message.success(resetMessage);
      } else {
        message.error(error);
      }
    }
  }

  return (
    <Container>
      {stage === 0 && (
        <>
          <h2>Entrar</h2>
          <p>Conecte-se com uma Rede Social</p>
          <DivBotoes>
            <BotaoFB>
              <AiFillFacebook size="30" />
              Facebook
            </BotaoFB>
            <GoogleLogin
              clientId={clientId}
              render={renderProps => (
                <BotaoG
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle size="30" />
                  Google
                </BotaoG>
              )}
              onSuccess={handleGoogleSignIn}
              cookiePolicy="single_host_origin"
            />
          </DivBotoes>
          <p>Entrar usando seu E-mail</p>
          <DivInput>
            <label htmlFor="username">
              E-mail
              <input
                type="text"
                name="email"
                onChange={e => setEmail(e.target.value)}
              />
            </label>
          </DivInput>
          <DivInput>
            <label htmlFor="password">
              Senha
              <input
                type="password"
                name="password"
                onChange={e => setPassword(e.target.value)}
              />
            </label>
          </DivInput>
          <DivBotoes>
            <BotaoLogin onClick={handleLogin}>
              Entrar
              {pending && <AiOutlineLoading className="spin" />}
            </BotaoLogin>
            <a
              href="#forgot"
              onClick={e => {
                e.preventDefault();
                setStage(1);
              }}
            >
              Esqueci a Senha
            </a>
          </DivBotoes>
          <h3>Obter Θαλία App</h3>
          <DivApp>
            <li>
              <AiFillApple />
              <span>Baixar na Apple Store</span>
            </li>
            <li>
              <SiGoogleplay />
              <span>Baixar no Google Play</span>
            </li>
          </DivApp>
        </>
      )}
      {stage === 1 && (
        <>
          <h2>Esqueci a Senha</h2>
          <p>Não se preocupe, vamos ajudá-lo a recuperar sua senha</p>
          <DivInput>
            <label htmlFor="email">
              E-mail
              <input
                type="email"
                name="email"
                onChange={e => setEmail(e.target.value)}
              />
            </label>
          </DivInput>
          <DivBotoes>
            <BotaoLogin onClick={handleForgot}>
              Me Enviar Instruções
              {pending && (
                <AiOutlineLoading className="spin" style={{ marginLeft: 10 }} />
              )}
            </BotaoLogin>
            <a
              href="#cancel"
              onClick={e => {
                e.preventDefault();
                setStage(2);
              }}
            >
              Eu Já Recebi Um Código
            </a>
            <a
              href="#cancel"
              onClick={e => {
                e.preventDefault();
                setStage(0);
              }}
            >
              Voltar
            </a>
          </DivBotoes>
        </>
      )}
      {stage === 2 && (
        <>
          <h2>Redefinir Senha</h2>
          <p>
            Um e-mail com o código de verificação foi enviado para o seu e-mail.
          </p>
          <DivInput>
            <label htmlFor="Code">
              Código
              <input
                type="Code"
                name="Code"
                onChange={e => setCode(e.target.value)}
              />
            </label>
          </DivInput>
          <DivInput>
            <label htmlFor="password">
              Senha
              <input
                type="password"
                name="password"
                onChange={e => setPassword(e.target.value)}
              />
            </label>
          </DivInput>
          <DivInput>
            <label htmlFor="passwordConfirm">
              Confirmação de Senha
              <input
                type="password"
                name="passwordConfirm"
                onChange={e => setPasswordConfirm(e.target.value)}
              />
            </label>
          </DivInput>
          <DivBotoes>
            <BotaoLogin onClick={handleReset}>
              Redefinir Senha
              {pending && (
                <AiOutlineLoading className="spin" style={{ marginLeft: 10 }} />
              )}
            </BotaoLogin>

            <a
              href="#back"
              onClick={e => {
                e.preventDefault();
                setStage(1);
              }}
            >
              Voltar
            </a>
          </DivBotoes>
        </>
      )}
    </Container>
  );
};

export default Login;
