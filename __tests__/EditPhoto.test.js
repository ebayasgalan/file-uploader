import React from 'react';
import EditPhoto from '../client/EditPhoto';
import {shallow} from 'enzyme';

const samplePhoto = {
  name: "testName",
  url: 'https://randomeURL',
  description: 'some content',
  favorite: false
}

describe('<EditPhoto />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EditPhoto pic={samplePhoto} />);
  });
  it('has a Edit Photo header', () => {
    expect(wrapper.find('h1').text()).toEqual('Edit Photo')
  });
  it('has a Save button', () => {
    expect(wrapper.find('button').at(0).text()).toEqual('Save')
  })
})