/*
 *
 * Authentication actions
 *
 */

import { SET_AUTH, CLEAR_AUTH } from './constants';

export const setAuth = () => {
  return {
    type: SET_AUTH
  };
};

export const clearAuth = () => {
  return {
    type: CLEAR_AUTH
  };
};
// At the bottom of actions.js

export const loginWithGoogle = () => () => {
  window.location.href = 'http://localhost:5000/api/auth/google';
};

export const loginWithFacebook = () => () => {
  window.location.href = 'http://localhost:5000/api/auth/facebook';
};

export const setAuthWithPayload = (userData) => {
  return {
    type: SET_AUTH,
    payload: userData
  };
};
