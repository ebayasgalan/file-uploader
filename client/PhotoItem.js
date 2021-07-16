import React from 'react';
import {navigate} from '@reach/router';
import styled from 'styled-components';

const StyledPhoto = styled.span`
  img:hover {
    cursor: pointer;
  }
`;

const Photo = ({photo, fetchSingle}) => {
  return(
    <StyledPhoto onClick={() => {
      fetchSingle(photo._id);
      navigate('single');
    }}>
      <img src={photo.url} alt="a photo" />
    </StyledPhoto>
  )
}

export default Photo;