import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function AgregarTarea() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages([...images, ...files]);
  };

  const handleSubmit = () => {
    // Aquí deberías enviar los datos a tu backend para crear la historia de usuario
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Images:', images);
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="my-4">Nueva Tarea</h1>
      <div className="mb-3 w-50">
        <label htmlFor="title" className="form-label">Título:</label>
        <input type="text" id="title" className="form-control" value={title} onChange={handleTitleChange} />
      </div>
      <div className="mb-3 w-50">
        <label htmlFor="description" className="form-label">Descripción:</label>
        <textarea id="description" className="form-control" value={description} onChange={handleDescriptionChange} />
      </div>
      <div className="mb-3 w-50">
        <label htmlFor="images" className="form-label">Imágenes:</label>
        <input type="file" id="images" className="form-control" multiple accept="image/*" onChange={handleImageUpload} />
      </div>
      <div className="mb-3 w-50">
        {images.map((image, index) => (
          <img key={index} src={URL.createObjectURL(image)} alt="Imagen" className="img-thumbnail mb-2" height="100" />
        ))}
      </div>
      <button style={{backgroundColor: '#007bff', color: 'white', padding:'5px',width:'150px', border:'none', borderRadius:'20px'}} onClick={handleSubmit}>Crear</button>
    </div>
  );
}

export default AgregarTarea;
