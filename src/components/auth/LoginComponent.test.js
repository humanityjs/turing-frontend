import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import LoginComponent from './LoginComponent';
import { AuthProvider } from '../context/auth.context';

describe('LoginComponent', () => {
  it('contains fields for user to login', () => {
    const user = {
      user: null,
      accessToken: null,
      isAuthenticated: false
    };
    const wrapper = mount(
      <AuthProvider state={{ user }}>
        <MemoryRouter>
          <LoginComponent />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(wrapper.find('input[name="email"]')).toHaveLength(1);
    expect(wrapper.find('input[name="password"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/create-account"]')).toHaveLength(1);
    expect(wrapper.find('button').contains('Login')).toBeTruthy();
  });
});
