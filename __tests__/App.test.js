import React from 'react';
import App from '../client/App';
import {shallow} from 'enzyme';

describe('<App />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  it('Renders Photos component', () => {
    expect(wrapper.find('Photos').exists()).toEqual(true)
  })
  it('Renders CreatePhoto component', () => {
    expect(wrapper.find('CreatePhoto').exists()).toEqual(true)
  })
  it('Renders EditPhoto component', () => {
    expect(wrapper.find('EditPhoto').exists()).toEqual(true)
  })
})