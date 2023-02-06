import axios from 'axios';

const BASE_URL = 'http://localhost:8080/';

export default {
  login(credentials) {
    console.log(credentials);
    return axios.post(`${BASE_URL}auth/login`,credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  },
  signup(credentials) {
    return axios.post(`${BASE_URL}auth/signup`, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  },
  resetPassword(credentials,token) {
    var x="Bearer "+token;
    return axios.post(`${BASE_URL}auth/reset-password`, credentials, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': x
        },
      });
  }
};