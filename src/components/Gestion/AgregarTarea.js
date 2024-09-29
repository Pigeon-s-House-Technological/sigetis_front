import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function AgregarTarea({ show, onHide, addTask, currentTask }) {
  const [nombreActividad, setNombreActividad] = useState(currentTask ? currentTask.nombre_actividad : '');
  const [estadoActividad, setEstadoActividad] = useState(currentTask ? currentTask.estado_actividad : 'pendiente');
  const [fechaInicio, setFechaInicio] = useState(currentTask ? currentTask.fecha_inicio : '');
  const [fechaFin, setFechaFin] = useState(currentTask ? currentTask.fecha_fin : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      id_hu: 1, // Cambia esto al ID correcto
      nombre_actividad: nombreActividad,
      estado_actividad: estadoActividad,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
    };

    addTask(task);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{currentTask ? 'Editar Tarea' : 'Agregar Tarea'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre de la Actividad</label>
            <input
              type="text"
              className="form-control"
              value={nombreActividad}
              onChange={(e) => setNombreActividad(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Estado de la Actividad</label>
            <select
              className="form-select"
              value={estadoActividad}
              onChange={(e) => setEstadoActividad(e.target.value)}
            >
              <option value="pendiente">Pendiente</option>
              <option value="en_progreso">En Progreso</option>
              <option value="completada">Completada</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha de Inicio</label>
            <input
              type="date"
              className="form-control"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha de Fin</label>
            <input
              type="date"
              className="form-control"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              required
            />
          </div>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AgregarTarea;