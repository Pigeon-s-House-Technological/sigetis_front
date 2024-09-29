import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const endPoint = 'http://localhost:8000/api/historiaUsuarios';

function AgregarHU({ newTask, setNewTask, isEditMode, taskId }) {
  const handleTitleChange = (event) => {
    setNewTask((prev) => ({ ...prev, title: event.target.value }));
  };

  const handleDescriptionChange = (event) => {
    setNewTask((prev) => ({ ...prev, description: event.target.value }));
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="my-4">{isEditMode ? 'Editar Historia de Usuario' : 'Agregar Historia de Usuario'}</h1>
      <form className="w-50" onSubmit={(e) => {
        e.preventDefault();
      }}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Título:</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={newTask.title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción:</label>
          <textarea
            id="description"
            className="form-control"
            value={newTask.description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
      </form>
    </div>
  );
}

export default AgregarHU;