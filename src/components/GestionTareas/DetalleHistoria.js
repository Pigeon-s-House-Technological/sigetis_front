import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
import AgregarTarea from './AgregarTarea';
import AsignarUsuario from './AsignarUsuario';
import { API_BASE_URL } from '../config';

const endPoint = `${API_BASE_URL}/actividades`; 

function DetalleHistoria() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [historia, setHistoria] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [showAsignarModal, setShowAsignarModal] = useState(false);

  // Fetch historia
  const fetchHistorias = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/historiaUsuarios/${id}`);
      setHistoria(response.data);
    } catch (error) {
      console.error("Error al obtener las historias:", error.response ? error.response.data : error.message);
    }
  };

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${endPoint}?id_hu=${id}`); // Asegúrate de que la API acepte este parámetro
      if (Array.isArray(response.data)) {
        setTasks(response.data);
      } else {
        console.error("La respuesta de la API no es un array:", response.data);
        setTasks([]);
      }
    } catch (error) {
      console.error("Error al obtener las tareas:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchHistorias();
    fetchTasks();
  }, [id]);

  const handleTaskResponse = async (method, task, taskId) => {
    try {
      const response = await axios({
        method,
        url: taskId ? `${endPoint}/${taskId}` : endPoint,
        data: task,
      });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Error en la operación de tarea');
    }
  };
  
  const addTask = async (task) => {
    const method = currentTask ? 'PUT' : 'POST';
    const taskId = currentTask ? currentTask.id : null;
  
    try {
      const updatedTask = await handleTaskResponse(method, task, taskId);
      setTasks((prevTasks) => {
        if (currentTask) {
          return prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));
        }
        return [...prevTasks, updatedTask];
      });
      fetchTasks(); // Actualiza las tareas desde el servidor después de agregar/editar
    } catch (error) {
      console.error(error.message);
    }
  
    setCurrentTask(null);
    setShowTaskModal(false);
  };
  

  const deleteTask = async (taskId) => {
    try {
      await handleTaskResponse('DELETE', null, taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleAsignarClick = (task) => {
    setCurrentTask(task);
    setShowAsignarModal(true);
  };

  const handleAsignarClose = () => {
    setShowAsignarModal(false);
  };

  const handleAsignarUsuario = async (usuario) => {
    if (currentTask) {
        // Actualiza el estado local para mostrar el nombre del usuario asignado
        const updatedTasks = tasks.map((task) =>
            task.id === currentTask.id ? { ...task, assigned: `${usuario.nombre_user} ${usuario.apellido_user}` } : task
        );
        setTasks(updatedTasks);

        // Actualiza la actividad en la base de datos usando el ID del usuario a través del método PATCH
        try {
            await axios.patch(`${API_BASE_URL}/actividadesP/${currentTask.id}`, {
                id_hu: currentTask.id_hu, // Suponiendo que `id_hu` es un campo requerido
                nombre_actividad: currentTask.nombre_actividad, // Suponiendo que `nombre_actividad` es requerido
                estado_actividad: currentTask.estado_actividad, // Suponiendo que `estado_actividad` es requerido
                fecha_inicio: currentTask.fecha_inicio, // Suponiendo que `fecha_inicio` es requerido
                fecha_fin: currentTask.fecha_fin, // Suponiendo que `fecha_fin` es requerido
                encargado: currentTask.encargado, // Suponiendo que `encargado` es requerido
                id_usuario: usuario.id, // Aquí se guarda el ID del usuario
            });
        } catch (error) {
            console.error('Error al asignar el usuario:', error.response ? error.response.data : error.message);
            // Opcional: revertir el cambio en el estado local si la API falla
            const revertedTasks = tasks.map((task) =>
                task.id === currentTask.id ? { ...task, assigned: null } : task
            );
            setTasks(revertedTasks);
        }
    }
    setShowAsignarModal(false);
  };

  if (!historia || !historia.titulo_hu) {
    return <div>Error: Historia no encontrada o no tiene título</div>;
  }

  return (
    <div className="container mt-5" style={{ backgroundColor: "#215F88" }}>
      <button className="btn btn-secondary" onClick={() => navigate(-1)} style={{ backgroundColor: '#09DDCC', color: "black" }}>Volver</button>
      <h1 className="text-center" style={{ color: 'white' }}>{historia.titulo_hu || 'Historia de Usuario'}</h1>

      <div className="card p-3 mb-3">
        <h2>Tareas</h2>
        <button className="btn btn-primary" onClick={() => {
          setCurrentTask(null);
          setShowTaskModal(true);
        }} style={{ backgroundColor: '#245F88' }}>Agregar Tarea</button>
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Asignado</th>
              <th>Estado</th>
              <th>Fecha inicio</th>
              <th>Fecha fin</th>
              <th>Resultado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.nombre_actividad}</td>
                <td>
                  <button className="btn btn-secondary" onClick={() => handleAsignarClick(task)}>
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
                    <Dropdown.Toggle variant="link" id="dropdown-basic">•••</Dropdown.Toggle>
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