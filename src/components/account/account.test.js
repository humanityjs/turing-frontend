import React from 'react';
import mockAxios from 'axios';
import {
  render,
  fireEvent,
  waitForElement,
  act,
  cleanup
} from '@testing-library/react';
import 'jest-dom/extend-expect';
import Account from './';
import { AuthProvider } from '../context/auth.context';

jest.mock('axios');

const state = {
  user: {
    customer_id: 1,
    name: 'Lannucci',
    email: 'lannucci@hotmail.com',
    address_1: 'QI 19',
    address_2: '',
    city: 'Lagos',
    region: 'Europe',
    postal_code: '234',
    country: 'Nigeria',
    shipping_region_id: 1,
    day_phone: '+351323213511235',
    eve_phone: '+452436143246123',
    mob_phone: '+351323213511235',
    credit_card: ''
  },
  accessToken: 'nushhuhll',
  isAuthenticated: true
};

describe('Accounts', () => {
  beforeEach(() => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: [
          {
            shipping_region_id: 1,
            shipping_region: 'Please Select'
          }
        ]
      })
    );
  });
  afterEach(cleanup);
  it('renders', () => {
    let wrapper;

    act(() => {
      wrapper = render(
        <AuthProvider dummyState={state}>
          <Account />
        </AuthProvider>
      );
    });

    expect(wrapper.baseElement.querySelector('#account-page')).toBeDefined();
  });

  it('calls onChange method on input change', async () => {
    let wrapper;

    act(() => {
      wrapper = render(
        <AuthProvider dummyState={state}>
          <Account />
        </AuthProvider>
      );
    });
    const nameInput = wrapper.getByPlaceholderText('Name');
    const emailInput = wrapper.getByPlaceholderText('Email');
    const shippingRegion = await waitForElement(() =>
      wrapper.getByPlaceholderText('Shipping Region')
    );
    const creditCard = wrapper
      .getByTestId('credit_card')
      .querySelector('input');
    fireEvent.change(nameInput, { target: { value: 'Daniel', name: 'name' } });
    fireEvent.change(emailInput, {
      target: { value: 'Daniel', name: 'email' }
    });
    fireEvent.change(shippingRegion, {
      target: { value: 1, name: 'shipping_region_id' }
    });
    fireEvent.change(creditCard, {
      target: { value: '4242 4242 4242 4242' }
    });
    expect(nameInput.value).toBe('Daniel');
    expect(shippingRegion.value).toBe('1');
    expect(emailInput.value).toBe('lannucci@hotmail.com');
    expect(creditCard.value).toBe('4242 4242 4242 4242');
  });

  it('submit user input', async () => {
    let wrapper;

    act(() => {
      wrapper = render(
        <AuthProvider dummyState={state}>
          <Account />
        </AuthProvider>
      );
    });
    const submitButton = wrapper.getByTestId('submitButton');
    fireEvent.click(submitButton);
    expect(submitButton).toHaveTextContent('Save');
    const creditCard = wrapper
      .getByTestId('credit_card')
      .querySelector('input');
    fireEvent.change(creditCard, {
      target: { value: '4242 4242 4242 4242' }
    });
    fireEvent.click(submitButton);
    expect(submitButton).toHaveTextContent('Saving');
  });
});
