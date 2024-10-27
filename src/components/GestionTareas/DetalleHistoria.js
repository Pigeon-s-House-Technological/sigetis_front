import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { API_BASE_URL } from '../config';

import ModalEliminar from '../General/Modales/ModalEliminar';
import BotonAtras from '../General/BotonAtras';
import './estilos.css'
import AgregarTarea from './AgregarTarea';
import AsignarModal from './Modales/AsignarModal';


function DetalleHistoria() {
  const { id } = useParams();
  const [historia, setHistoria] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [idEliminar, setIdEliminar] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAsignarModal, setShowAsignarModal] = useState(false);
  const [integrantes, setIntegrantes] = useState([]);
  const [selectedIntegrante, setSelectedIntegrante] = useState(null);
  const [grupo, setGrupo] = useState(null);
  const [idAsignar, setIdAsignar] = useState(null);
  const navigate = useNavigate(); // Inicializar useNavigate

  // Fetch historia
  const fetchHistorias = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/historiaUsuarios/${id}`);
      if(response.data){
        setHistoria(response.data);
        
      }else{
        console.error("La respuesta de la API no es un array:", response.data);
        setHistoria([]);
      }
      
    } catch (error) {
      console.error("Error al obtener las historias:", error.response ? error.response.data : error.message);
    }
  };

  // Fetch tasks
  const fetchTasks = async () => {
    await obtenerGrupo();
    try {
      const response = await axios.get(`${API_BASE_URL}/actividades`);
      
      if (Array.isArray(response.data)) {
        const filteredTasks = response.data.filter(task => task.id_hu === parseInt(id));
        
        // Obtener detalles del encargado para cada tarea
        const tasksWithEncargado = await Promise.all(filteredTasks.map(async (task) => {
          if (task.encargado) {
            try {
              const encargadoResponse = await axios.get(`${API_BASE_URL}/usuarios/${task.encargado}`);
              return {
                ...task,
                encargado: encargadoResponse.data.usuario.nombre,
                estado_actividad: task.estado_actividad || '' // Asegurarse de que no sea null
              };
            } catch (error) {
              console.error(`Error al obtener los detalles del encargado para la tarea ${task.id}:`, error);
              return {
                ...task,
                encargado: null,
                estado_actividad: task.estado_actividad || '' // Asegurarse de que no sea null
              };
            }
          } else {
            console.log('no existe encargado');
            return {
              ...task,
              encargado: null,
              estado_actividad: task.estado_actividad || '' // Asegurarse de que no sea null
            };
            
          }
        }));

        setTasks(tasksWithEncargado);
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

  const fetchIntegrantes = async () => {
    
    const grupoId = grupo;
    try {
      const response = await axios.get(`${API_BASE_URL}/gruposUsuarios/integrantes/${grupoId}`);
      const integrantesArray = Object.values(response.data.integrantes); // Convertir el objeto en un array
      setIntegrantes(integrantesArray);
      console.log('Integrantes:', integrantesArray);
    } catch (error) {
      console.error('Error al obtener los integrantes del grupo:', error);
    }
  };

  useEffect(() => {
    if (showAsignarModal) {
      fetchIntegrantes();
    }
  }, [showAsignarModal, grupo]);

  const obtenerGrupo =() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setGrupo(user.grupoId);
    }else{
      console.error('Usuario no autenticado');
    }
  };

  const handleAsignar = (taskId) => {
    setShowAsignarModal(true);
    setIdAsignar(taskId);
  };

  const handleAsignarIntegrante = async () => {
    console.log('Asignando tarea a:', selectedIntegrante);
    console.log('Tarea actual:', currentTask);
    if (!selectedIntegrante) {
      console.error('No se ha seleccionado ningún integrante');
      setShowAsignarModal(false);
    }

    try {
      const response = await axios.patch(`${API_BASE_URL}/actividadesP/${idAsignar}`, {
        encargado: selectedIntegrante.id,
      });
      console.log('Tarea asignada correctamente:', response.data.actividad);
      setTasks(tasks.map(task => (task.id === idAsignar ? response.data.actividad : task)));
      fetchTasks();
      setShowAsignarModal(false);
      
    } catch (error) {
      console.error('Error al asignar la tarea:', error);
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

  const handleVerResultados = (taskId) => {
    navigate(`/resultados/${taskId}`);
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
                <button onClick={() => handleAsignar(task.id)} className="btn-encargado">
                  {task.encargado ? task.encargado : 'Sin encargado'}
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
                <td><button className="btn-resultados" onClick={() => handleVerResultados(task.id)}>Ver resultados</button></td>
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
      <AsignarModal
        show={showAsignarModal}
        integrantes={integrantes}
        onClose={() => setShowAsignarModal(false)}
        onAsignar={handleAsignarIntegrante}
        onSelectIntegrante={(id) => {
          const integrante = integrantes.find(i => i.id === id);
          setSelectedIntegrante(integrante);
        }}
      />
    </div>
  );
}

export default DetalleHistoria;