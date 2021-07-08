import React from 'react';
import { shallow } from 'enzyme';
import Photos from '../client/Photos';

describe('<Photos />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Photos />);
  })
  it('displays Welcome to photos app!', () => {
    expect(wrapper.find('h1').text()).toEqual('Welcome to photos app!');
  })
  it('has a add button', () => {
    expect(wrapper.find('button').text()).toEqual('Add New Photo');
  })
})