import { message } from 'antd';
import React from 'react';
import GoogleLogin from 'react-google-login';
import { AiFillApple, AiFillFacebook, AiOutlineApple } from 'react-icons/ai';
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
  const { signIn } = useAuth();
  async function handleGoogleSignIn(res) {
    const thirdPartyToken = res.getAuthResponse().id_token;
    try {
      await signIn({ thirdPartyToken });
      setModalState(mState => ({
        ...mState,
        visible: false,
      }));
    } catch (err) {
      message.error(err);
    }
  }

  return (
    <Container>
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
      <form action="">
        <p>Log in whith your Email</p>
        <DivInput>
          <label htmlFor="username">
            Email
            <input id="login-email-name" type="text" name="username" />
          </label>
        </DivInput>
        <DivInput>
          <label htmlFor="password">
            Password
            <input id="login-email-password" type="password" name="password" />
          </label>
        </DivInput>
      </form>
      <DivBotoes>
        <BotaoLogin>Log in</BotaoLogin>
        <a href="#esqueceu">Forgot password</a>
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
    </Container>
  );
};

export default Login;
