import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

// axios configs for private endpoints
const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// axios configs for public endpoints
const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

export { BASE_URL, axiosPrivate, axiosPublic };
