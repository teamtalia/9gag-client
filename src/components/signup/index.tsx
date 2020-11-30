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
      message.error('You need to complete the captcha challenge');
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
          <h2>Hey there!</h2>
          <span>
            <b>Θαλία</b>
            {` is your best source for fun. Share anything you find interesting,
            get real responses from people all over the world, and discover what
            makes you laugh.`}
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
              {`Sign up with your `}
              <a href="#login/email" onClick={() => setStage(1)}>
                Email
              </a>
            </p>
            <p>
              {`Have an account? `}
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
                Log in
              </a>
            </p>
          </section>
          <section data-bottom="no">
            <ButtonsAppsContainer>
              <h3>Get Θαλία App</h3>
            </ButtonsAppsContainer>
            <ButtonsContainer>
              <button type="button" data-mode="black">
                <FaApple size={28} />
                <div>
                  <span>Download on</span>
                  <span>Apple Store</span>
                </div>
              </button>
              <button type="button" data-mode="black">
                <FaGooglePlay size={26} />
                <div>
                  <span>Get It On</span>
                  <span>Google Play</span>
                </div>
              </button>
            </ButtonsContainer>
          </section>
        </div>
      )}
      {stage === 1 && (
        <div>
          <h1>Become a member</h1>
          <label htmlFor="fullname">
            Full Name
            <input type="text" onChange={e => setFullname(e.target.value)} />
          </label>
          <label htmlFor="email">
            Email
            <input type="text" onChange={e => setEmail(e.target.value)} />
          </label>

          <label htmlFor="password">
            Password
            <input
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          <br />
          <ReCAPTCHA
            sitekey="6Lcz0u4ZAAAAAFLD5L0z7FGdA4ToQPblhcBBD1Ha"
            onChange={val => setCaptcha(val)}
          />
          <br />
          <Button type="primary" onClick={handleSignUp}>
            Sign Up
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
