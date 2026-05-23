import axios from 'axios';

export const nominatimClient = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});
