import React from 'react';
import { shallow } from 'enzyme';
import CountrySelect from './CountrySelect';

describe('CountrySelect', () => {
  it('has 240 countries', () => {
    const wrapper = shallow(<CountrySelect />);
    expect(wrapper.find('option').length).toBe(240);
  });
});
