import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { API_BASE_URL } from '../config';
import axios from 'axios';

const endPoint = `${API_BASE_URL}/actividades`;

function AgregarTarea({ show, onHide, addTask, currentTask }) {
  const [nombreActividad, setNombreActividad] = useState('');
  const [estadoActividad, setEstadoActividad] = useState('pendiente');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Efecto para cargar los datos actuales de la tarea al editar
  useEffect(() => {
    if (currentTask) {
      setNombreActividad(currentTask.nombre_actividad);
      setEstadoActividad(currentTask.estado_actividad);
      setFechaInicio(currentTask.fecha_inicio);
      setFechaFin(currentTask.fecha_fin);
    } else {
      setNombreActividad('');
      setEstadoActividad('pendiente');
      setFechaInicio('');
      setFechaFin('');
    }
  }, [currentTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de fechas
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);
    if (fechaInicioDate > fechaFinDate) {
      setErrorMessage('La fecha de inicio no puede ser posterior a la fecha de fin.');
      return;
    }

    const task = {
      id_hu: 1, // Cambia esto al ID correcto
      nombre_actividad: nombreActividad,
      estado_actividad: estadoActividad,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
    };

    try {
      let response;
      if (currentTask) {
        // Actualiza la tarea existente
        response = await axios.put(`${endPoint}/${currentTask.id}`, task);
      } else {
        // Crea una nueva tarea
        response = await axios.post(endPoint, task);
      }
      addTask(response.data);
      onHide();
    } catch (error) {
      console.error(error);
      setErrorMessage('Error al guardar la tarea. Intenta nuevamente.');
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{currentTask ? 'Editar Tarea' : 'Agregar Tarea'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
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