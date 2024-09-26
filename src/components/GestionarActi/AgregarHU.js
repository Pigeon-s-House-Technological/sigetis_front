import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

const endPoint = 'http//localhost:8000/sigetis_api-main'
function AgregarHU({ newTask, setNewTask }) {
  const handleTitleChange = (event) => {
    setNewTask((prev) => ({ ...prev, title: event.target.value }));
  };

  const handleDescriptionChange = (event) => {
    setNewTask((prev) => ({ ...prev, description: event.target.value }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setNewTask((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="my-4"></h1>
      <div className="mb-3 w-50">
        <label htmlFor="title" className="form-label">Título:</label>
        <input type="text" id="title" className="form-control" value={newTask.title} onChange={handleTitleChange} />
      </div>
      <div className="mb-3 w-50">
        <label htmlFor="description" className="form-label">Descripción:</label>
        <textarea id="description" className="form-control" value={newTask.description} onChange={handleDescriptionChange} />
      </div>
      <div className="mb-3 w-50">
        <label htmlFor="images" className="form-label">Imágenes:</label>
        <input type="file" id="images" className="form-control" multiple accept="image/*" onChange={handleImageUpload} />
      </div>
      <div className="mb-3 w-50">
        {newTask.images.map((image, index) => (
          <img key={index} src={URL.createObjectURL(image)} alt="Imagen" className="img-thumbnail mb-2" height="100" />
        ))}
      </div>
    </div>
  );
}

export default AgregarHU;