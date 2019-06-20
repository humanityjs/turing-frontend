import axios from 'axios';

export function createCart() {
  return axios.get(
    'https://backendapi.turing.com/shoppingcart/generateUniqueId'
  );
}

export function getCart(cartId) {
  return axios.get(`https://backendapi.turing.com/shoppingcart/${cartId}`);
}

export function addToCart({ cartId, productId, attributes, quantity }) {
  return axios.post(`https://backendapi.turing.com/shoppingcart/add`, {
    cart_id: cartId,
    product_id: productId,
    attributes,
    quantity
  });
}

export function editItem({ itemId, quantity }) {
  return axios.put(
    `https://backendapi.turing.com/shoppingcart/update/${itemId}`,
    {
      quantity
    }
  );
}

export function removeProduct(itemId) {
  return axios.delete(
    `https://backendapi.turing.com/shoppingcart/removeProduct/${itemId}`
  );
}

export function getShippingMethods(regionId) {
  return axios.get(
    `https://backendapi.turing.com/shipping/regions/${regionId}`
  );
}

export function createOrder(payload) {
  return axios.post(`https://backendapi.turing.com/orders`, payload, {
    headers: {
      'user-key': window.localStorage.getItem('accessToken')
    }
  });
}

export function processPayment(payload) {
  return axios.post(`https://backendapi.turing.com/stripe/charge`, payload, {
    headers: {
      'user-key': window.localStorage.getItem('accessToken')
    }
  });
}
