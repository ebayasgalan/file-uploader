import React from 'react';

const Photo = ({url, name, decription, favorite}) => {
  return(
    <>
    <h2>Name: {name}</h2>
    <img src={url} alt="a photo" />
    <p>{description}</p>
    <p>{favorite}</p>
    </>
  )
}

export default Photo;