import React, {useState, useEffect} from 'react';
import {Link} from '@reach/router';
import EditPhoto from './EditPhoto';

const SinglePhoto = ({pic}) => {
  const [isEditing, setIsEditing] = useState(false);

  return( 
    <>
    {isEditing ? <EditPhoto pic={pic} /> : (
      <div>
        <Link to="/">Back</Link>
        <h2>Name: {pic.name}</h2>
        <img src={pic.url} alt="a photo" />
        <p>Description: {pic.description}</p>
        <p>favorite: {pic.favorite.toString()}</p>
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </div>
    )
    }
    </>
  )
}

export default SinglePhoto;