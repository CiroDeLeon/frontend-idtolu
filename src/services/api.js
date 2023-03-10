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
  getRoleByUsername(userName) {

    return axios.post(`${BASE_URL}auth/roleByUsername/username/${userName}`);
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
  },
  onlyForAdmin(credentials,token) {
    var x="Bearer "+token;
    return axios.post(`${BASE_URL}auth/only-for-admin`, credentials, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': x
        },
      });
  },
  onlyForUser(credentials,token) {
    var x="Bearer "+token;
    return axios.post(`${BASE_URL}auth/only-for-user`, credentials, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': x
        },
      });
  }
};