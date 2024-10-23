import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { API_BASE_URL } from '../config';

import ModalEliminar from '../General/Modales/ModalEliminar';
import BotonAtras from '../General/BotonAtras';
import './estilos.css'
import AgregarTarea from './AgregarTarea';
import AsignarUsuario from './AsignarUsuario';


function DetalleHistoria() {
  const { id } = useParams();
  const [historia, setHistoria] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [idEliminar, setIdEliminar] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
      const response = await axios.get(`${API_BASE_URL}/actividades`); // Asegúrate de que la API acepte este parámetro
      if (Array.isArray(response.data)) {
        setTasks(response.data.map(task => ({
          ...task,
          estado_actividad: task.estado_actividad || '' // Asegurarse de que no sea null
        })));
      } else {
        console.error("La respuesta de la API no es un array:", response.data);
        setTasks([]);
      }
    } catch (error) {
      console.error("Error al obtener las tareas:", error.response ? error.response.data : error.message);
      setTasks([]);
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
        url: taskId ? `${API_BASE_URL}/actividades/${taskId}` : `${API_BASE_URL}/actividades`,
        data: task,
      });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Error en la operación de tarea');
    }
  };

  if (!historia || !historia.titulo_hu) {
    return <div>Error: Historia no encontrada o no tiene título</div>;
  }

  const crearClick = () => {
    setShowTaskModal(true);
  };

  const editarClick = (task) => {
    setCurrentTask(task);
    setShowEditTaskModal(true);
  };

  const eliminarClick = (id) => {
    setIdEliminar(id);
    setShowConfirmModal(true);
  };

  const handleSave = async (datos) => {
    if(datos.estado === 'pendiente'){
      datos.estado = 1;
    }else if(datos.estado === 'en_progreso'){
      datos.estado = 2;
    }else{
      datos.estado = 3;
    }
    try{
      const response = await axios.post(`${API_BASE_URL}/actividades`, {
        nombre_actividad: datos.nombre,
        estado_actividad: datos.estado,
        fecha_inicio: datos.fecha_inicio,
        fecha_fin: datos.fecha_fin,
        id_hu: id
      });
      console.log ('Tarea guardada:', response.data.actividad);
      setTasks([...tasks, response.data.actividad]);
    }catch(error){
      console.error('Error al guardar la tarea:', error);
    }
  }

  const handleEditSave = async(datos) => {
    if(datos.estado === 'pendiente'){
      datos.estado = 1;
    }else if(datos.estado === 'en_progreso'){
      datos.estado = 2;
    }else{
      datos.estado = 3;
    }
    try{
      const response = await axios.patch(`${API_BASE_URL}/actividadesP/${currentTask.id}`, {
        nombre_actividad: datos.nombre,
        estado_actividad: datos.estado,
        fecha_inicio: datos.fecha_inicio,
        fecha_fin: datos.fecha_fin,
      });
      console.log ('Tarea editada correctamente:', response.data.actividad);
      setTasks(tasks.map(task => (task.id === currentTask.id ? response.data.actividad : task)));
    }catch(error){
      console.error('Error al guardar la tarea:', error);
    }
  };

  const handleAsignar = () => {
  };

  const handleConfirmDelete = async () => {
    const id = idEliminar;
    try{
      await axios.delete(`${API_BASE_URL}/actividades/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
      console.log('Tarea eliminada correctamente');
      setShowConfirmModal(false)
    }catch(error){
      console.error('Error al eliminar la tarea:', error);
    }
  };

  return (
    <div className="container" style={{  }}>
      
      <h2 className="text-center" style={{ color: 'black' }}>Actividades</h2>

      <div className="">
        <div className="d-flex align-items-center justify-content-between">
          <h3>{historia.titulo_hu || 'Historia de Usuario'}</h3>
          <BotonAtras />
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-primary" onClick={() => {crearClick();}} 
          style={{ backgroundColor: '#007BFF' }}>Agregar Tarea
          </button>
        </div>
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
                  <button className="btn btn-secondary" onClick={() => handleAsignar()}>
                    {task.encargado ? task.encargado : 'Asignar'}
                  </button>
                </td>
                <td>
                  <select
                    value={task.estado_actividad}
                    onChange={async (e) => {
                      const updatedTask = { ...task, estado_actividad: e.target.value };
      
                      // Actualizar la tarea en el estado local
                      setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));

                      // Realizar la solicitud PATCH para actualizar la tarea en la base de datos
                      try {
                        await axios.patch(`${API_BASE_URL}/actividadesP/${task.id}`, {
                          estado_actividad: e.target.value,
                        });
                        console.log('Estado de la tarea actualizado en la base de datos');
                      } catch (error) {
                        console.error('Error al actualizar el estado de la tarea:', error);
                      }
                    }}
                  >
                    <option value="1">Pendiente</option>
                    <option value="2">En progreso</option>
                    <option value="3">Completada</option>
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
                        editarClick(task);
                      }}>Editar</Dropdown.Item>
                      <Dropdown.Item onClick={() => eliminarClick(task.id)}>Eliminar</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AgregarTarea
        show={showTaskModal}
        onHide={() => setShowTaskModal(false)}
        currentTask={currentTask}
        handleSave={handleSave}
        titulo={"Agregar Actividad"}
        isEditMode={false}
      />  
      <ModalEliminar
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        handleConfirmDelete={handleConfirmDelete}
        titulo={"esta actividad"}
      />
      <AgregarTarea
        show={showEditTaskModal}
        onHide={() => setShowEditTaskModal(false)}
        currentTask={currentTask}
        handleSave={handleEditSave}
        titulo={"Agregar Actividad"}
        isEditMode={true}
      /> 
    </div>
  );
}

export default DetalleHistoria;