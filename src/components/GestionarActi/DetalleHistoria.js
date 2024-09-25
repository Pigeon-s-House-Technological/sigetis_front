import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AgregarTarea from './AgregarTarea';
import AsignarUsuario from './AsignarUsuario';

function DetalleHistoria() {
  const location = useLocation();
  const navigate = useNavigate();
  const { historia } = location.state || {};
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [showAsignarModal, setShowAsignarModal] = useState(false);

  if (!historia) {
    return <div className="alert alert-warning" role="alert">No hay historia seleccionada</div>;
  }

  const addTask = (task) => {
    if (currentTask) {
      // Actualiza la tarea existente
      setTasks(tasks.map(t => (t.name === currentTask.name ? task : t)));
      setCurrentTask(null);
    } else {
      // Agrega una nueva tarea
      setTasks([...tasks, { ...task, assigned: 'No asignado' }]);
    }
    setShowTaskModal(false);
  };

  const editTask = (task) => {
    setCurrentTask(task);
    setShowTaskModal(true);
  };

  const deleteTask = (taskName) => {
    setTasks(tasks.filter(task => task.name !== taskName));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
    e.target.value = ''; // Resetea el input
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const handleAsignarClick = (task) => {
    setCurrentTask(task);
    setShowAsignarModal(true);
  };

  const handleAsignarClose = () => {
    setShowAsignarModal(false);
  };

  const handleAsignarUsuario = (usuario) => {
    if (currentTask) {
      const updatedTasks = tasks.map((task) =>
        task.name === currentTask.name ? { ...task, assigned: usuario } : task
      );
      setTasks(updatedTasks);
    }
    setShowAsignarModal(false);
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>Volver</button>
      <h3 className='text-center mb-4'>Historia de Usuarios</h3>
      <h1 className="text-center">{historia.title || 'Historia de Usuario'}</h1>
      <div className="card p-3 mb-3">
        <h2>Descripción</h2>
        <p>{historia.description || 'No proporcionado'}</p>
      </div>
      <div className="card p-3 mb-3">
        <h2>Archivos Adjuntos</h2>
        {files.length > 0 ? (
          <p>{files.length} archivos adjuntos</p>
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
        <button className="btn btn-primary" onClick={() => {
          setCurrentTask(null);
          setShowTaskModal(true);
        }}>+ Agregar Tarea</button>
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
            {tasks.map((task) => (
              <tr key={task.name}>
                <td>{task.name}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleAsignarClick(task)}
                  >
                    {task.assigned}
                  </button>
                </td>
                <td>
                  <select
                    value={task.status}
                    onChange={(e) => {
                      const updatedTask = { ...task, status: e.target.value };
                      setTasks(tasks.map((t) => (t.name === task.name ? updatedTask : t)));
                    }}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="en_progreso">En progreso</option>
                    <option value="completada">Completada</option>
                  </select>
                </td>
                <td>{task.startDate}</td>
                <td>{task.endDate}</td>
                <td>{task.result}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => editTask(task)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => deleteTask(task.name)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showTaskModal && (
        <div className="modal-container">
          <AgregarTarea
            show={showTaskModal}
            onHide={() => setShowTaskModal(false)}
            addTask={addTask}
            currentTask={currentTask}
          />
        </div>
      )}

      {showAsignarModal && (
        <div className="modal-container">
          <AsignarUsuario
            show={showAsignarModal}
            onHide={handleAsignarClose}
            handleAsignarUsuario={handleAsignarUsuario}
            currentTask={currentTask}
          />
        </div>
      )}
    </div>
  );
}

export default DetalleHistoria;