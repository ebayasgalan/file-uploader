import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const EditPhoto = ({pic, cancel}) => {
  const [name, setName] = useState(pic.name);
  const [photo, setPhoto] = useState(pic.url);
  const [description, setDescription] = useState('');
  const [favorite, setFavorite] = useState(false);

  function handleChange(e) {
    const inputName = e.target.name;
    switch(inputName) {
      case 'name': setName(e.target.value);
        break;
      case 'photo': setPhoto(e.target.files[0]);
        break;
      case 'description': setDescription(e.target.value);
        break;
      case 'favorite': setFavorite(e.target.value);
        break;
    }
  }

  const saveToDB = (id) => {
      let file = photo;
      let formData = new FormData();
      formData.append('image', file);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('favorite', favorite);
      formData.append('prevPicUrl', pic.url);
      console.log('from saveToDB', formData);
      axios.patch(`/photo/${id}`, formData)
        .then(res => console.log(res.data))
        .catch(err => console.log(err)); 
  }

  return (
    <>
    <form onSubmit={e => {
      e.preventDefault();
      saveToDB(pic._id);
      navigate('/');
    }}>
      <h1>Edit Photo</h1>
      <label>Name:</label>
        <input required type="text" name='name' onChange={handleChange} />
      <label>Description: 
        <textarea required name='description' onChange={handleChange} />
      </label>
      <label>Favorite:
        <select type="boolean" name='favorite' onChange={handleChange}>
          <option value={true}>yes</option>
          <option value={false}>no</option>
        </select>
      </label>
      <label>
        <input required type="file" name='photo' onChange={handleChange}/>
      </label>
      <button type="submit">Save</button>
    </form>
      <button onClick={() => cancel()}>Cancel</button>
    </>
  )
};

export default EditPhoto;