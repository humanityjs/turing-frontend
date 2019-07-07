import React from 'react';
import mockAxios from 'axios';
import { render, fireEvent, wait, act, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import SignUpComponent from './SignUpComponent';
import { AuthProvider } from '../context/auth.context';

jest.mock('axios');
describe('SignUpComponent', () => {
  afterEach(cleanup);
  it('renders', () => {
    const { container } = render(
      <AuthProvider>
        <MemoryRouter>
          <SignUpComponent />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(container.querySelector('#signup-wrapper')).toBeDefined();
  });

  it('create new user', async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          customer: {},
          accessToken: 'jjbsjfbsj',
          expires_in: '24h'
        }
      })
    );
    const { container, getByPlaceholderText } = render(
      <AuthProvider>
        <MemoryRouter>
          <SignUpComponent />
        </MemoryRouter>
      </AuthProvider>
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const nameInput = getByPlaceholderText('Name');
    const signupButton = container.querySelector('#signupButton');
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
      fireEvent.change(nameInput, {
        target: { name: 'name', value: 'Daniel' },
        preventDefault: () => null
      });
    });
    act(() => {
      fireEvent.click(signupButton);
    });
    await wait();
    expect(window.localStorage.getItem('accessToken')).toBeDefined();
  });
});
