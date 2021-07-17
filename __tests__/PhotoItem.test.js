import React from 'react';
import { shallow } from 'enzyme';
import PhotoItem from '../client/PhotoItem';

const samplePhoto = {
  url: 'someRandomURL'
}

describe('<PhotoItem />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PhotoItem photo={samplePhoto} />);
  })
  
  it('has a img element', () => {
    expect(wrapper.find('img').props().alt).toEqual('a photo');
  })
})