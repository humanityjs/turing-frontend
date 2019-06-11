import axios from 'axios';

export function createCart() {
  return axios.get(
    'https://backendapi.turing.com/shoppingcart/generateUniqueId'
  );
}

export function getCart(cartId) {
  return axios.get(`https://backendapi.turing.com/shoppingcart/${cartId}`);
}
