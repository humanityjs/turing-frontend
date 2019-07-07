import React from 'react';
import mockAxios from 'axios';
import { render, fireEvent, act, wait } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Cart from './';
import { ProductProvider } from '../context/products.context';

jest.mock('axios');

describe('Cart component', () => {
  it('renders', () => {
    const state = {
      cart: []
    };
    const { container } = render(
      <ProductProvider state={state}>
        <Cart />
      </ProductProvider>
    );

    expect(container.querySelector('p')).toHaveTextContent('No item in cart');
  });

  it('renders the cart', () => {
    const state = {
      loading: true,
      products: null,
      page: 1,
      product: {},
      cart: [
        {
          item_id: 2,
          name: "Arc d'Triomphe",
          attributes: 'LG, red',
          product_id: 2,
          price: '14.99',
          quantity: 1,
          image: 'arc-d-triomphe.gif',
          subtotal: '14.99'
        }
      ]
    };
    const { container } = render(
      <ProductProvider dummyState={state}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </ProductProvider>
    );

    expect(container.querySelector('#cart-2')).toBeDefined();
  });

  it('removes product from the cart', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(true));
    const state = {
      loading: true,
      products: null,
      page: 1,
      product: {},
      cart: [
        {
          item_id: 2,
          name: "Arc d'Triomphe",
          attributes: 'LG, red',
          product_id: 2,
          price: '14.99',
          quantity: 1,
          image: 'arc-d-triomphe.gif',
          subtotal: '14.99'
        }
      ]
    };
    const { container } = render(
      <ProductProvider dummyState={state}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </ProductProvider>
    );

    expect(container.querySelector('#cart-2')).toBeDefined();

    const deleteButton = container.querySelector('#delete-2');
    act(() => {
      fireEvent.click(deleteButton, 2);
    });

    await wait();
    console.log(container.querySelector('#cart-2'));
    expect(container.querySelector('#cart-2')).toBeNull();
  });
});
