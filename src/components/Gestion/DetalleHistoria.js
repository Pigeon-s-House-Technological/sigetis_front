import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import AgregarTarea from './AgregarTarea';
import AsignarUsuario from './AsignarUsuario';

const endPoint = 'http://localhost:8000/api/actividades';

function DetalleHistoria() {
  const location = useLocation();
  const navigate = useNavigate();
  const { historia } = location.state || {};
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [showAsignarModal, setShowAsignarModal] = useState(false);

  // Fetch activities from the API
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(endPoint);
        if (!response.ok) {
          throw new Error('Error al obtener las actividades');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchActivities();
  }, []);

  const addTask = async (task) => {
    if (currentTask) {
      // Update task
      try {
        const response = await fetch(`${endPoint}/${currentTask.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        });

        if (!response.ok) {
          throw new Error('Error al actualizar la tarea');
        }

        const updatedTask = await response.json();
        setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      // Add new task
      try {
        const response = await fetch(endPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        });

        if (!response.ok) {
          throw new Error('Error al agregar la tarea');
        }

        const newTask = await response.json();
        setTasks([...tasks, newTask]);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    setCurrentTask(null);
    setShowTaskModal(false);
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`${endPoint}/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la tarea');
      }

      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error:', error);
    }
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
        task.id === currentTask.id ? { ...task, assigned: usuario } : task
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
              <tr key={task.id}>
                <td>{task.nombre_actividad}</td>
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
                    value={task.estado_actividad}
                    onChange={(e) => {
                      const updatedTask = { ...task, estado_actividad: e.target.value };
                      setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
                    }}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="en_progreso">En progreso</option>
                    <option value="completada">Completada</option>
                  </select>
                </td>
                <td>{task.fecha_inicio}</td>
                <td>{task.fecha_fin}</td>
                <td>{task.resultado}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="link" id="dropdown-basic">
                      •••
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => {
                        setCurrentTask(task);
                        setShowTaskModal(true);
                      }}>Editar</Dropdown.Item>
                      <Dropdown.Item onClick={() => deleteTask(task.id)}>Eliminar</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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