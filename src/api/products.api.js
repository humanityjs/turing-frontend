import axios from 'axios';

export function getProducts(page = 1) {
  return axios.get(`https://backendapi.turing.com/products?page=${page}`);
}

export function getProductsWithCategory(page = 1, categoryId) {
  return axios.get(
    `https://backendapi.turing.com/products/inCategory/${categoryId}?page=${page}`
  );
}

export function productSearch(page = 1, queryString) {
  return axios.get(
    `https://backendapi.turing.com/products/search?query_string=${queryString}?page=${page}`
  );
}

export function getProduct(productId) {
  return axios.get(`https://backendapi.turing.com/products/${productId}`);
}

export function getReviews(productId) {
  return axios.get(
    `https://backendapi.turing.com/products/${productId}/reviews`
  );
}

export function addReviews(productId, postData) {
  return axios.post(
    `https://backendapi.turing.com/products/${productId}/reviews`,
    postData
  );
}
