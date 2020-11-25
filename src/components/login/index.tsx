import React from 'react';
import { AiFillApple, AiFillFacebook, AiOutlineApple } from 'react-icons/ai';
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
  return (
    <Container>
      <h2>Log in</h2>
      <p>Connect with a social network</p>
      <DivBotoes>
        <BotaoFB>
          <AiFillFacebook size="30" />
          Facebook
        </BotaoFB>
        <BotaoG>
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
