import React, { useState, useEffect } from 'react';

import './Modales/Modal.css'; // Importa el archivo CSS para el modal


function AgregarTarea({ show, onHide, handleSave, currentTask, titulo, isEditMode }) {
  const [nombreActividad, setNombreActividad] = useState('');
  const [estadoActividad, setEstadoActividad] = useState('pendiente');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    
    if (isEditMode && currentTask) {
      if(currentTask.estado_actividad === 1){
        setEstadoActividad('pendiente');
      }else if(currentTask.estado_actividad === 2){
        setEstadoActividad('en_progreso');
      }else{
        setEstadoActividad('completada');
      }

      setNombreActividad(currentTask.nombre_actividad || '');
      setFechaInicio(currentTask.fecha_inicio || '');
      setFechaFin(currentTask.fecha_fin || '');
    } else {
      setNombreActividad('');
      setEstadoActividad('pendiente');
      setFechaInicio('');
      setFechaFin('');
    }
  }, [currentTask, isEditMode]);

  const cargarDatos = (e) => {
    e.preventDefault();
    if (new Date(fechaFin) < new Date(fechaInicio)) {
      setErrorMessage('La fecha de fin no puede ser menor que la fecha de inicio');
      return;
    }
    if (!nombreActividad || !estadoActividad || !fechaInicio || !fechaFin) {
      setErrorMessage('Todos los campos son obligatorios');
      return;
    }

    const datos = {
      nombre: nombreActividad,
      estado: estadoActividad,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
    };
    handleSave(datos);
    limpiarFormulario();
    onHide();
    
    
  };

  const limpiarFormulario = () => {
    setNombreActividad('');
    setEstadoActividad('pendiente');
    setFechaInicio('');
    setFechaFin('');
    setErrorMessage('');
  };

  return (
    
    <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">{titulo}</h4>
          <button type="button" className="close" onClick={onHide} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <form onSubmit={cargarDatos}>
            <div className="form-group">
              <label htmlFor="nombreActividad">Nombre de la Actividad</label>
              <input
                type="text"
                className="form-control"
                id="nombreActividad"
                name="nombreActividad"
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
                name="estadoActividad"
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
              id="fechaInicio"
              name="fechaInicio"
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
                id="fechaFin"
                name="fechaFin"
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