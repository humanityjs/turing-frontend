import React from 'react';
import mockAxios from 'axios';
import { mount } from 'enzyme';
import Account from './';
import { AuthProvider } from '../context/auth.context';

jest.mock('axios');

describe('Accounts', () => {
  it('renders', () => {
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
    const user = {
      user: null,
      accessToken: null,
      isAuthenticated: false
    };
    const wrapper = mount(
      <AuthProvider state={{ user }}>
        <Account />
      </AuthProvider>
    );
    expect(wrapper.find('input[name="name"]')).toHaveLength(1);
    expect(wrapper.find('input[name="email"]')).toHaveLength(1);
    expect(wrapper.find('input[name="address_1"]')).toHaveLength(1);
    expect(wrapper.find('input[name="address_2"]')).toHaveLength(1);
    expect(wrapper.find('select[name="shipping_region_id"]')).toHaveLength(1);
    expect(wrapper.find('input[name="city"]')).toHaveLength(1);
    expect(wrapper.find('input[name="postal_code"]')).toHaveLength(1);
    expect(wrapper.find('input[name="mob_phone"]')).toHaveLength(1);
  });
});
