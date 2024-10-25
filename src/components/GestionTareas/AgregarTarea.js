import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import './Modales/Modal.css'; // Importa el archivo CSS para el modal

const endPoint = `${API_BASE_URL}/actividades`;

function AgregarTarea({ show, onHide, addTask, currentTask }) {
  const [nombreActividad, setNombreActividad] = useState('');
  const [estadoActividad, setEstadoActividad] = useState('pendiente');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [encargado, setEncargado] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Efecto para cargar los datos actuales de la tarea al editar
  useEffect(() => {
    if (currentTask) {
      setNombreActividad(currentTask.nombre_actividad);
      setEstadoActividad(currentTask.estado_actividad);
      setFechaInicio(currentTask.fecha_inicio);
      setFechaFin(currentTask.fecha_fin);
      setEncargado(currentTask.encargado);
    } else {
      setNombreActividad('');
      setEstadoActividad('pendiente');
      setFechaInicio('');
      setFechaFin('');
      setEncargado('');
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
      id_hu: 1, 
      nombre_actividad: nombreActividad,
      estado_actividad: estadoActividad,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      encargado: 1,
    };
  
    console.log('Datos enviados:', task);
   
    try {
      let response;
      if (currentTask) {
        response = await axios.put(`${endPoint}/${currentTask.id}`, task);
      } else {
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
    
    <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">{currentTask ? 'Editar Tarea' : 'Agregar Tarea'}</h4>
          <button type="button" className="close" onClick={onHide} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombreActividad">Nombre de la Actividad</label>
              <input
                type="text"
                className="form-control"
                id="nombreActividad"
                placeholder="Ingresa el nombre de la actividad"
                value={nombreActividad}
                onChange={(e) => setNombreActividad(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="estadoActividad">Estado de la Actividad</label>
              <select
                className="form-control"
                id="estadoActividad"
                value={estadoActividad}
                onChange={(e) => setEstadoActividad(e.target.value)}
                required
              >
                <option value="">Selecciona el estado</option>
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
          <div className='form-group'>
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
          </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" style={{ backgroundColor: '#09DDCC', color: 'black' }} onClick={onHide}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#007BFF' }}>
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}

export default AgregarTarea;