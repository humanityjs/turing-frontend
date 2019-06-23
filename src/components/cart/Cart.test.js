import React from 'react';
import { mount } from 'enzyme';
import Cart from './';
import { ProductProvider } from '../context/products.context';

describe('Cart component', () => {
  it('renders', () => {
    const state = {
      cart: []
    };
    const wrapper = mount(
      <ProductProvider state={state}>
        <Cart />
      </ProductProvider>
    );

    expect(wrapper.find('p').contains('No item in cart')).toBeTruthy();
  });
});
