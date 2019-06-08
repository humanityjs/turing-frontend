import axios from 'axios';

export function getProducts(page = 1) {
  return axios.get(`https://backendapi.turing.com/products?page=${page}`);
}
