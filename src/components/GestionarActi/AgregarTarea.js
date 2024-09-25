import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AsignarUsuario from './AsignarUsuario';

const AgregarTarea = ({ show, onHide, addTask, currentTask }) => {
  const [task, setTask] = useState({
    name: '',
    assigned: 'No asignado', // Valor predeterminado
    status: 'Nuevo', // Valor predeterminado
    startDate: '',
    endDate: '',
  });

  const [showAsignarModal, setShowAsignarModal] = useState(false);

  useEffect(() => {
    if (currentTask) {
      setTask(currentTask);
    } else {
      setTask({
        name: '',
        assigned: 'No asignado',
        status: 'Nuevo',
        startDate: '',
        endDate: '',
      });
    }
  }, [currentTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tarea a agregar:", task); // Debugging
    addTask(task);
    setTask({
      name: '',
      assigned: 'No asignado',
      status: 'Nuevo',
      startDate: '',
      endDate: '',
    });
    onHide(); // Cierra el modal después de agregar la tarea
  };

  const handleAsignarUsuario = (usuario) => {
    console.log("Usuario asignado:", usuario); // Debugging
    setTask({ ...task, assigned: usuario });
    setShowAsignarModal(false); // Cierra el modal de asignar usuario
  };

  if (!show) return null; // Asegúrate de que el modal se muestre solo si 'show' es true

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <h2>{currentTask ? 'Actualizar Tarea' : 'Agregar Tarea'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={task.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="assigned" className="form-label">Asignado</label>
            <button
              type="button"
              className="form-control btn btn-secondary"
              onClick={() => setShowAsignarModal(true)} // Abre el modal de asignar usuario
            >
              {task.assigned}
            </button>
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Estado</label>
            <select
              className="form-control"
              id="status"
              name="status"
              value={task.status}
              onChange={handleChange}
            >
              <option value="Nuevo">Nuevo</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En proceso">En proceso</option>
              <option value="Completado">Completado</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">Fecha inicio</label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              name="startDate"
              value={task.startDate}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">Fecha fin</label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              name="endDate"
              value={task.endDate}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {currentTask ? 'Actualizar Tarea' : 'Agregar Tarea'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onHide}>
            Cancelar
          </button>
        </form>
      </div>
      {showAsignarModal && (
        <AsignarUsuario
          show={showAsignarModal}
          onHide={() => setShowAsignarModal(false)}
          handleAsignarUsuario={handleAsignarUsuario}
          currentTask={task} // Pasa la tarea actual
        />
      )}
    </div>
  );
};

export default AgregarTarea;