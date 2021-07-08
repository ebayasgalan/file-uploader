import React from 'react';
import CreatePhoto from '../client/CreatePhoto';
import {shallow} from 'enzyme';

describe('<CreatePhoto />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CreatePhoto />);
  });
  it('Displays a header', () => {
    expect(wrapper.find('h1').html()).toEqual('<h1>Create a new photo</h1>');
  })
  it('Has a submit button', () => {
    expect(wrapper.find('button').exists()).toEqual(true)
  })
})