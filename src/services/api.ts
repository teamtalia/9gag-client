import axios from 'axios';
import { baseURL } from '../config/constants';

const api = axios.create({
  baseURL,
});

export default api;
