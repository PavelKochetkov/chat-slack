const API_VERSION = '/api/v1';

const PAGE_ROUTES = {
  PAGE_CHAT: '/',
  PAGE_LOGIN: '/login',
  PAGE_SIGNUP: '/signup',
  PAGE_NOT_FOUND: '*',
};

const API_ROUTES = {
  SIGNUP: 'signup',
  LOGIN: 'login',
  CHANNELS: 'channels',
  MESSAGES: 'messages',
};

export const generatePageRoute = (route) => PAGE_ROUTES[route];

export const generateAuthApiRoute = (route) => `${API_VERSION}/${API_ROUTES[route]}`;
