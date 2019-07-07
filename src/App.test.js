import React from 'react';
import mockAxios from 'axios';
import { render, act, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import App from './App';

jest.mock('axios');
describe('App', () => {
  afterEach(cleanup);
  it('renders', () => {
    mockAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          cart_id: 'hsueishfh'
        }
      })
    );
    let wrapper;

    act(() => {
      wrapper = render(<App />);
    });

    expect(wrapper.getByTestId('main-app')).toBeDefined();
  });
});
