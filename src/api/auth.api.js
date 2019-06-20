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

export function getRegions() {
  return axios.get('https://backendapi.turing.com/shipping/regions');
}

export function editCustomer(payload) {
  return axios.put('https://backendapi.turing.com/customer', payload, {
    headers: {
      'user-key': window.localStorage.getItem('accessToken')
    }
  });
}

export function editCustomerAddress(payload) {
  return axios.put('https://backendapi.turing.com/customers/address', payload, {
    headers: {
      'user-key': window.localStorage.getItem('accessToken')
    }
  });
}

export function editCustomerCard(payload) {
  return axios.put(
    'https://backendapi.turing.com/customers/creditCard',
    payload,
    {
      headers: {
        'user-key': window.localStorage.getItem('accessToken')
      }
    }
  );
}
