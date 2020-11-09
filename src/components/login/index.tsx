import React from 'react';
import { AiFillFacebook, AiOutlineApple } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { SiGoogleplay } from 'react-icons/si';
import {
  DivApp,
  Container,
  BotaoLogin,
  BotaoG,
  BotaoFB,
  DivInput,
  DivBotoes,
} from './styles';

const Login: React.FC = () => {
  function Facebook() {}
  function Google() {}
  function FunctionLogin() {}
  return (
    <Container>
      <h2>Log in</h2>
      <p>Connect with a social network</p>
      <DivBotoes>
        <BotaoFB onClick={Facebook}>
          <AiFillFacebook size="30" />
          Facebook
        </BotaoFB>
        <BotaoG onClick={Google()}>
          <FcGoogle size="30" />
          Google
        </BotaoG>
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
        <BotaoLogin onClick={FunctionLogin}>Log in</BotaoLogin>
        <a href="#esqueceu">Forgot password</a>
      </DivBotoes>
      <h3>Get Θαλία app</h3>
      <DivApp>
        <li>
          <a href="#IOS">
            <AiOutlineApple />
            Download on the Apple Store
          </a>
        </li>
        <li>
          <a href="#android">
            <SiGoogleplay />
            Get it on Google Play
          </a>
        </li>
      </DivApp>
    </Container>
  );
};

export default Login;
