import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function AgregarTarea({ addTask }) {
  const [task, setTask] = useState({
    name: '',
    assigned: '',
    status: '',
    startDate: '',
    endDate: '',
    result: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask({
      name: '',
      assigned: '',
      status: '',
      startDate: '',
      endDate: '',
      result: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nombre</label>
        <input type="text" className="form-control" id="name" name="name" value={task.name} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="assigned" className="form-label">Asignado</label>
        <input type="text" className="form-control" id="assigned" name="assigned" value={task.assigned} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="status" className="form-label">Estado</label>
        <input type="text" className="form-control" id="status" name="status" value={task.status} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="startDate" className="form-label">Fecha inicio</label>
        <input type="date" className="form-control" id="startDate" name="startDate" value={task.startDate} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="endDate" className="form-label">Fecha fin</label>
        <input type="date" className="form-control" id="endDate" name="endDate" value={task.endDate} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="result" className="form-label">Resultado</label>
        <input type="text" className="form-control" id="result" name="result" value={task.result} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary">Agregar Tarea</button>
    </form>
  );
}

export default AgregarTarea;