import React from 'react';
import mockAxios from 'axios';
import { render, fireEvent, wait, act, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import LoginComponent from './LoginComponent';
import { AuthProvider } from '../context/auth.context';

jest.mock('axios');
describe('LoginComponent', () => {
  afterEach(cleanup);
  it('renders', () => {
    const { container } = render(
      <AuthProvider>
        <MemoryRouter>
          <LoginComponent />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(container.querySelector('#login-wrapper')).toBeDefined();
  });

  it('signs user in', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          customer: {
            customer_id: 14292,
            name: 'Daniel Bamidele',
            email: 'greatbolutife@gmail.com',
            address_1: '16, Solaru street, Ifako',
            address_2: '',
            city: 'Lagos',
            region: 'US / Canada',
            postal_code: '234',
            shipping_region_id: 2,
            credit_card: '4242 4242 4242 4242',
            day_phone: null,
            eve_phone: null,
            mob_phone: '08066193821'
          },
          accessToken: 'jjbsjfbsj',
          expires_in: '24h'
        }
      })
    );
    const { container, getByPlaceholderText } = render(
      <AuthProvider>
        <MemoryRouter>
          <LoginComponent />
        </MemoryRouter>
      </AuthProvider>
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = container.querySelector('#loginButton');
    expect(window.localStorage.getItem('accessToken')).toBeNull();

    act(() => {
      fireEvent.change(emailInput, {
        target: { name: 'email', value: 'email@email.com' },
        preventDefault: () => null
      });
    });
    act(() => {
      fireEvent.change(passwordInput, {
        target: { name: 'password', value: '123456' },
        preventDefault: () => null
      });
    });
    act(() => {
      fireEvent.click(loginButton);
    });
    await wait();
    expect(window.localStorage.getItem('accessToken')).toBeDefined();
  });
});
