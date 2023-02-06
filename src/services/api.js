import axios from 'axios';

const BASE_URL = 'http://localhost:8080/';

export default {
  login(credentials) {
    console.log(credentials);
    const obj = {
        username: credentials.username,
        password: credentials.password,
        role: 'USER'
      };
    return axios.post(`${BASE_URL}auth/login`,obj, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  },
  signup(credentials) {
    console.log(credentials);
    const obj = {
        username: credentials.username,
        password: credentials.password,
        role: 'USER'
      };
    return axios.post(`${BASE_URL}auth/signup`,obj, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  },
  resetPassword(credentials,token) {
    const obj = {
        username: credentials.username,
        password: credentials.password,
        role: 'USER'
      };
    var x="Bearer "+token;
    return axios.post(`${BASE_URL}auth/reset-password`, obj, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': x
        },
      });
  },
  getRoleByUsername(userName) {

    return axios.post(`${BASE_URL}auth/roleByUsername/username/${userName}`);
      
  }

};