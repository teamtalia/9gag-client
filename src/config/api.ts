import Axios from 'axios';

export const api = Axios.create({
  baseURL: 'localhost:3001',
});
