import axios from 'axios';

export function createNewUser(payload) {
  return axios.post('https://backendapi.turing.com/customers', payload);
}

export function login(payload) {
  return axios.post('https://backendapi.turing.com/customers/login', payload);
}

export function getUser() {
  return axios.get('https://backendapi.turing.com/customer', {
    headers: {
      'user-key': window.localStorage.getItem('accessToken')
    }
  });
}
