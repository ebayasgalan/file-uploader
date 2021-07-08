import React from 'react';
import {navigate} from '@reach/router';

const Photo = ({photo, fetchSingle}) => {
  return(
    <span onClick={() => {
      fetchSingle(photo._id);
      navigate('single');
    }}>
      <img src={photo.url} alt="a photo" />
    </span>
  )
}

export default Photo;