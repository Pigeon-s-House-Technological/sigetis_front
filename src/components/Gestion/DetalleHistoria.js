import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
import AgregarTarea from './AgregarTarea';
import AsignarUsuario from './AsignarUsuario';
import {API_BASE_URL} from '../config';

const endPoint = `${API_BASE_URL}`;

function DetalleHistoria() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [historia, setHistoria] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [showAsignarModal, setShowAsignarModal] = useState(false);

  const fetchHistorias = async () => {
    try {
      const response = await axios.get(`${endPoint}/historiaUsuarios/${id}`);
      setHistoria(response.data);
    } catch (error) {
      console.error("Error al obtener las historias:", error.response ? error.response.data : error.message);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${endPoint}/${id}/actividades`);

    } catch (error) {
      console.error("Error al obtener las tareas:", error.response ? error.response.data : error.message);
    }
  }

  // Fetch activities from the API

  useEffect(() => {
    fetchHistorias();
  }, [])

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

  if (!historia || !historia.titulo_hu) {
    return <div>Error: Historia no encontrada o no tiene título</div>;
  }

  return (
    <div className="container mt-5" style={{backgroundColor:"#215F88"}}>
      <button className="btn btn-secondary" onClick={() => navigate(-1)} style={{ backgroundColor: '#09DDCC', color:"black"}}>Volver</button>
      <h1 className="text-center" style={{ color: 'white' }}>{historia.titulo_hu || 'Historia de Usuario'}</h1>
      
      <div className="card p-3 mb-3">
        <h2>Tareas</h2>
        <button className="btn btn-primary" onClick={() => {
          setCurrentTask(null);
          setShowTaskModal(true);
        }}style={{ backgroundColor: '#245F88' }}>Agregar Tarea</button>
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