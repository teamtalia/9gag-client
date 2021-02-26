import { Button, message } from 'antd';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import GoogleLogin from 'react-google-login';
import { AiFillFacebook, AiOutlineLoading } from 'react-icons/ai';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import Login from '../login';
import { ModalStateProps } from '../navbar';
import { ButtonsAppsContainer, ButtonsContainer, Container } from './styles';
import { clientId } from '../../config/google';
import useAuth from '../../hooks/useAuth';

interface ModalProps {
  setModalState: any;
  modalState: ModalStateProps;
}
interface SignupProps {
  modal: ModalProps;
}

const Signup: React.FC<SignupProps> = ({
  modal: { setModalState, modalState },
}) => {
  const [stage, setStage] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [captcha, setCaptcha] = useState('');
  const { signUp, pending } = useAuth();

  async function handleGoogleSignIn(res) {
    const thirdPartyToken = res.getAuthResponse().id_token;

    const err = await signUp({ thirdPartyToken });
    if (err) {
      message.error(err);
      return;
    }
    setModalState(mState => ({
      ...mState,
      visible: false,
    }));

    //
  }
  function handleGoogleSignInError(err) {
    message.error(err);
  }
  async function handleSignUp() {
    if (!captcha) {
      message.error('Você precisa completar o desafio do captcha');
      return;
    }
    if (email && fullname && password) {
      const err = await signUp({ email, password, fullname });
      if (err) {
        message.error(err);
        return;
      }
      setModalState(mState => ({
        ...mState,
        visible: false,
      }));
    }
  }

  return (
    <Container>
      {stage === 0 && (
        <div>
          <h2>Olá!</h2>
          <span>
            <b>Θαλία</b>
            {` é a sua melhor fonte de diversão. Compartilhe tudo que você achar interessante,
             obtenha respostas reais de pessoas em todo o mundo e descubra o que o faz rir..`}
          </span>
          <section>
            <ButtonsContainer>
              <button type="button" data-mode="fb">
                <AiFillFacebook size={40} />
                <div>Facebook</div>
              </button>
              <GoogleLogin
                clientId={clientId}
                render={renderProps => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    type="button"
                  >
                    <FcGoogle size={26} type="google" />
                    <div>Google</div>
                  </button>
                )}
                onSuccess={handleGoogleSignIn}
                onFailure={handleGoogleSignInError}
                onAutoLoadFinished={e => console.log(e)}
                cookiePolicy="single_host_origin"
              />
            </ButtonsContainer>
          </section>
          <section>
            <p>
              {`Inscreva-se com o seu `}
              <a href="#login/email" onClick={() => setStage(1)}>
                E-mail
              </a>
            </p>
            <p>
              {`Tem uma conta? `}
              <a
                href="#login"
                onClick={e => {
                  e.preventDefault();
                  setModalState(oldModalState => ({
                    ...oldModalState,
                    component: () => (
                      <Login modal={{ setModalState, modalState }} />
                    ),
                  }));
                }}
              >
                Entrar
              </a>
            </p>
          </section>
          <section data-bottom="no">
            <ButtonsAppsContainer>
              <h3>Baixar Θαλία App</h3>
            </ButtonsAppsContainer>
            <ButtonsContainer>
              <button type="button" data-mode="black">
                <FaApple size={28} />
                <div>
                  <span>Baixar na</span>
                  <span>Apple Store</span>
                </div>
              </button>
              <button type="button" data-mode="black">
                <FaGooglePlay size={26} />
                <div>
                  <span>Baixar no</span>
                  <span>Google Play</span>
                </div>
              </button>
            </ButtonsContainer>
          </section>
        </div>
      )}
      {stage === 1 && (
        <div>
          <h1>Torne-se um membro</h1>
          <label htmlFor="fullname">
            Nome Completo
            <input type="text" onChange={e => setFullname(e.target.value)} />
          </label>
          <label htmlFor="email">
            E-mail
            <input type="text" onChange={e => setEmail(e.target.value)} />
          </label>

          <label htmlFor="password">
            Senha
            <input
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          <br />
          <ReCAPTCHA
            sitekey="6Lcz0u4ZAAAAAFLD5L0z7FGdA4ToQPblhcBBD1Ha"
            onChange={val => setCaptcha(val)}
            hl="pt-BR"
          />
          <br />
          <Button type="primary" onClick={handleSignUp}>
            Cadastro
            {pending && (
              <AiOutlineLoading className="spin" style={{ marginLeft: 10 }} />
            )}
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Signup;
