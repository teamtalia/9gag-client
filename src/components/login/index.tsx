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
          <h2>Log in</h2>
          <p>Connect with a social network</p>
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
          <p>Log in whith your Email</p>
          <DivInput>
            <label htmlFor="username">
              Email
              <input
                type="text"
                name="email"
                onChange={e => setEmail(e.target.value)}
              />
            </label>
          </DivInput>
          <DivInput>
            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                onChange={e => setPassword(e.target.value)}
              />
            </label>
          </DivInput>
          <DivBotoes>
            <BotaoLogin onClick={handleLogin}>
              Log in
              {pending && <AiOutlineLoading className="spin" />}
            </BotaoLogin>
            <a
              href="#forgot"
              onClick={e => {
                e.preventDefault();
                setStage(1);
              }}
            >
              Forgot password
            </a>
          </DivBotoes>
          <h3>Get Θαλία app</h3>
          <DivApp>
            <li>
              <AiFillApple />
              <span>Download on the Apple Storea</span>
            </li>
            <li>
              <SiGoogleplay />
              <span>Get it on Google Play</span>
            </li>
          </DivApp>
        </>
      )}
      {stage === 1 && (
        <>
          <h2>Forgot Password</h2>
          <p>{`Don't worry we will help you to recover your password `}</p>
          <DivInput>
            <label htmlFor="email">
              email
              <input
                type="email"
                name="email"
                onChange={e => setEmail(e.target.value)}
              />
            </label>
          </DivInput>
          <DivBotoes>
            <BotaoLogin onClick={handleForgot}>
              SEND ME INSTRUCTION
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
              I already have a code
            </a>
            <a
              href="#cancel"
              onClick={e => {
                e.preventDefault();
                setStage(0);
              }}
            >
              Cancel
            </a>
          </DivBotoes>
        </>
      )}
      {stage === 2 && (
        <>
          <h2>Reset Password</h2>
          <p>An email with verification code has been sent to your email.</p>
          <DivInput>
            <label htmlFor="Code">
              Code
              <input
                type="Code"
                name="Code"
                onChange={e => setCode(e.target.value)}
              />
            </label>
          </DivInput>
          <DivInput>
            <label htmlFor="password">
              password
              <input
                type="password"
                name="password"
                onChange={e => setPassword(e.target.value)}
              />
            </label>
          </DivInput>
          <DivInput>
            <label htmlFor="passwordConfirm">
              Password Confirm
              <input
                type="passwordConfirm"
                name="passwordConfirm"
                onChange={e => setPasswordConfirm(e.target.value)}
              />
            </label>
          </DivInput>
          <DivBotoes>
            <BotaoLogin onClick={handleReset}>
              Reset Password
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
              Back
            </a>
          </DivBotoes>
        </>
      )}
    </Container>
  );
};

export default Login;
