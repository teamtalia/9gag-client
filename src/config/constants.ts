export const MOBILE_APP_URL = 'https://expo.io/@thales_dev/projects/Talia';

export const baseURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:5000`
    : `https://api.taliaapp.co/`;
