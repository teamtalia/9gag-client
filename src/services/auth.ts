import api from './api';

export interface SignInProps {
  email?: string;
  password?: string;
  thirdPartyToken?: string;
}

interface SignInApiResponse {
  token: string;
  user: any;
}
interface SignInResponse extends SignInApiResponse {
  error?: string;
}

export interface SignUpProps {
  fullname?: string;
  email?: string;
  password?: string;
  thirdPartyToken?: string;
}
interface SignUpResponse {
  error?: string;
}

export async function signIn({
  email,
  password,
  thirdPartyToken,
}: SignInProps): Promise<SignInResponse> {
  /* eslint-disable prettier/prettier */
  const data = thirdPartyToken
    ? { thirdPartyToken }
    : {
      email,
      password,
    };
  /* eslint-enable prettier/prettier */

  try {
    const {
      data: { token, user },
    } = await api.post<SignInApiResponse>('/session', data);
    return {
      user,
      token,
    };
  } catch (err) {
    if (err.response) {
      const {
        response: { data: responseData },
      } = err;
      return {
        error: responseData.message ? responseData.message : err.message,
      } as SignInResponse;
    }
    return {
      error: err,
    } as SignInResponse;
  }
}

export async function signUp({
  fullname,
  email,
  password,
  thirdPartyToken,
}: SignUpProps): Promise<SignUpResponse> {
  /* eslint-disable prettier/prettier */
  const data = thirdPartyToken
    ? { thirdPartyToken }
    : {
      fullname,
      email,
      password,
    };
  /* eslint-enable prettier/prettier */

  try {
    await api.post<SignInApiResponse>('/users', data);
    return {};
  } catch (err) {
    if (err.response) {
      const {
        response: { data: responseData },
      } = err;
      return {
        error: responseData.message ? responseData.message : err.message,
      };
    }
    return {
      error: err,
    };
  }
}

export interface SendPasswordResetProps {
  email: string;
}
interface SendPasswordResetResponse {
  error?: string;
}

export async function sendPasswordReset({
  email,
}: SendPasswordResetProps): Promise<SendPasswordResetResponse> {
  try {
    await api.post('/users/password/reset', { email });
    return {};
  } catch (err) {
    if (err.response) {
      const {
        response: { data: responseData },
      } = err;
      return {
        error: responseData.message ? responseData.message : err.message,
      };
    }
    return {
      error: err,
    };
  }
}

export interface PasswordResetProps {
  code: string;
  password: string;
  passwordConfirm: string;
}
interface PasswordResetResponse {
  message?: string;
  error?: string;
}

export async function passwordReset({
  code,
  password,
  passwordConfirm,
}: PasswordResetProps): Promise<PasswordResetResponse> {
  try {
    const {
      data: { message },
    } = await api.put('/users/password/reset', {
      code,
      password,
      passwordConfirm,
    });
    return { message };
  } catch (err) {
    if (err.response) {
      const {
        response: { data: responseData },
      } = err;
      return {
        error: responseData.message ? responseData.message : err.message,
      };
    }
    return {
      error: err,
    };
  }
}
