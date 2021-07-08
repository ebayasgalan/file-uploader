import React from 'react';
import { shallow } from 'enzyme';
import SinglePhoto from '../client/SinglePhoto';

const samplePhoto = {
  name: "testName",
  url: 'https://randomeURL',
  description: 'some content',
  favorite: false
}

describe('SinglePhoto', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SinglePhoto pic={samplePhoto} />);
  })
  it('has a Edit button', () => {
    expect(wrapper.find('button').at(0).text()).toEqual('Edit');
  })
  it('img tag points to randomURL', () => {
    expect(wrapper.find('img').props().src).toEqual("https://randomeURL");
  })
})