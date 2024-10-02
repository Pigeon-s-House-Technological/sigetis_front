import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_BASE_URL } from '../config';

const endPoint = `${API_BASE_URL}/historiaUsuarios`;
function AgregarHU() {
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const handleTitleChange = (evento) => {
    setNewTask((prev) => ({ ...prev, title: evento.target.value }));
  };

  const handleDescriptionChange = (evento) => {
    setNewTask((prev) => ({ ...prev, description: evento.target.value }));
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="my-4">Agregar historia de usuario</h1>
      <form className="w-50" onSubmit={(e) => { e.preventDefault(); }}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Título:</label>
          <input type="text" id="title" className="form-control" value={newTask.title} onChange={handleTitleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción:</label>
          <textarea id="description" className="form-control" value={newTask.description} onChange={handleDescriptionChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Agregar</button>
      </form>
    </div>
  );
}

export default AgregarHU;