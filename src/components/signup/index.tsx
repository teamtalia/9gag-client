import { Button, message } from 'antd';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import GoogleLogin from 'react-google-login';
import { AiFillFacebook } from 'react-icons/ai';
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
  const [state, setStage] = useState(0);
  const { signUp } = useAuth();

  async function handleGoogleSignIn(res) {
    const thirdPartyToken = res.getAuthResponse().id_token;
    try {
      await signUp({ thirdPartyToken });
      setModalState(mState => ({
        ...mState,
        visible: false,
      }));
    } catch (err) {
      message.error(err);
    }
  }
  async function handleGoogleSignInError(err) {
    console.log('err', err);
  }

  return (
    <Container>
      {state === 0 && (
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
                    component: () => <Login />,
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
      {state === 1 && (
        <div>
          <h1>Become a member</h1>
          <label htmlFor="fullname">
            Full Name
            <input type="text" name="fullname" />
          </label>
          <label htmlFor="email">
            Email
            <input type="text" name="email" />
          </label>

          <label htmlFor="password">
            Password
            <input type="password" name="password" />
          </label>
          <br />
          <ReCAPTCHA
            sitekey="6Lcz0u4ZAAAAAFLD5L0z7FGdA4ToQPblhcBBD1Ha"
            onChange={a => console.log(a)}
          />
          <br />
          <Button type="primary">Sign Up</Button>
        </div>
      )}
    </Container>
  );
};

export default Signup;
