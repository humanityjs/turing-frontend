import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import SignUpComponent from './SignUpComponent';
import { AuthProvider } from '../context/auth.context';

describe('SignUpComponent', () => {
  it('contains fields for user to signup', () => {
    const user = {
      user: null,
      accessToken: null,
      isAuthenticated: false
    };
    const wrapper = mount(
      <AuthProvider state={{ user }}>
        <MemoryRouter>
          <SignUpComponent />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(wrapper.find('input[name="name"]')).toHaveLength(1);
    expect(wrapper.find('input[name="email"]')).toHaveLength(1);
    expect(wrapper.find('input[name="password"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/login"]')).toHaveLength(1);
    expect(wrapper.find('button').contains('Create Account')).toBeTruthy();
  });
});
