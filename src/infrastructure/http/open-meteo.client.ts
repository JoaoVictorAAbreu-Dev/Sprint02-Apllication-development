import axios from 'axios';

export const openMeteoClient = axios.create({
  baseURL: 'https://api.open-meteo.com',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});
