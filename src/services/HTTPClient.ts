import axios from 'axios';
import getTokenStorage from '../utils/tokens/getTokenStorage';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
};

const axiosConfig = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 30000,
  headers: defaultHeaders,
});

axiosConfig.defaults.headers.common.authorization = getTokenStorage();

export function setAxiosAuth(): void {
  axiosConfig.defaults.headers.common.authorization = getTokenStorage();
}

class HTTPClient {
  static api = axiosConfig;
}

export default HTTPClient;
