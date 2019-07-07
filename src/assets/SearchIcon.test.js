import React from 'react';
import { render } from '@testing-library/react';
import SearchIcon from './searchIcon';

describe('SearchIcon', () => {
  it('renders', () => {
    const { container } = render(<SearchIcon />);
    expect(container.querySelector('svg')).toBeDefined();
  });
});
