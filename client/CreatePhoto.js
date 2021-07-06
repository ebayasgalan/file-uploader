import React, {useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';

const CreatePhoto = () => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState([]);
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

  function fileUpload(e){
    let file = photo;
    let formData = new FormData();
    formData.append('image', file);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('favorite', favorite);
    console.log('formData from CreatePhoto: ', formData);
    axios.post('/photo', formData)
      .then(res => navigate('/'))
      .catch(err => console.log(err));
  }

  return (
    <>
    <form onSubmit={e => {
      e.preventDefault();
      fileUpload(e);
    }}>
      <h1>Welcome to photos app!</h1>
      <p>you can upload your photos and select your favorite one</p>
      <label>Name:
        <input type="text" name='name' onChange={handleChange} />
      </label>
      <label>Description: 
        <textarea name='description' onChange={handleChange} />
      </label>
      <label>Favorite:
        <select type="boolean" name='favorite' onChange={handleChange}>
          <option value={false}>no</option>
          <option value={true}>yes</option>
        </select>
      </label>
      <label>
        <input required type="file" name='photo' onChange={handleChange}/>
      </label>
      <button type="submit">Submit</button>
    </form>
    </>
  )
};

export default CreatePhoto;