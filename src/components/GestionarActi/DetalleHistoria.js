import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AgregarTarea from './AgregarTarea';

function DetalleHistoria() {
  const location = useLocation();
  const navigate = useNavigate();
  const { historia } = location.state || {};
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  if (!historia) {
    return <div className="alert alert-warning" role="alert">No hay historia seleccionada</div>;
  }

  const addTask = (task) => {
    setTasks([...tasks, task]);
    setShowTaskModal(false);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
    e.target.value = ''; // Resetea el input
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">HISTORIA DE USUARIO</h1>
      <button className="btn btn-secondary mb-3" onClick={goBack}>Volver</button>
      <div className="card p-3 mb-3">
        <h2>Descripción</h2>
        <p>{historia.description || 'No proporcionado'}</p>
      </div>
      <div className="card p-3 mb-3">
        <h2>Archivos Adjuntos</h2>
        {files.length > 0 ? (
          <>
            <p>{files.length} archivos adjuntos</p>
          </>
        ) : (
          <p>No hay archivos adjuntos.</p>
        )}
        <button className="btn btn-primary" onClick={openFilePicker}>+ Agregar Archivo</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileChange}
          multiple
        />
      </div>
      <div className="card p-3 mb-3">
        <h2>Tareas</h2>
        <button className="btn btn-primary" onClick={() => setShowTaskModal(true)}>+ Agregar Tarea</button>
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Asignado</th>
              <th>Estado</th>
              <th>Fecha inicio</th>
              <th>Fecha fin</th>
              <th>Resultado</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.name}</td>
                <td>{task.assigned}</td>
                <td>{task.status}</td>
                <td>{task.startDate}</td>
                <td>{task.endDate}</td>
                <td>{task.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para agregar tarea */}
      {showTaskModal && (
        <div className="modal fade show" id="taskModal" tabIndex="-1" aria-labelledby="taskModalLabel" aria-hidden="true" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="taskModalLabel">Agregar Tarea</h5>
                <button type="button" className="btn-close" onClick={() => setShowTaskModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <AgregarTarea addTask={addTask} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetalleHistoria;