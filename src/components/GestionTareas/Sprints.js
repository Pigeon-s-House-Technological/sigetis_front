import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { BsTrashFill, BsPencilSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

import ModalAgregarSprint from './Modales/ModalAgregarSprint';
import ModalEliminar from '../General/Modales/ModalEliminar';
import BotonAtras from '../General/BotonAtras';


function Sprints() {
  const [sprints, setSprints] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newSprintName, setNewSprintName] = useState('');
  const [grupo, setGrupo] = useState(null);
  const [selectedSprint, setSelectedSprint] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null);
  // Fetch historia
  const fetchSprints = async () => {
    obtenerGrupo();
    try{
        const response = await axios.get(`${API_BASE_URL}/sprints`);
        
        if(Array.isArray(response.data)){
          const filteredSprints = response.data.filter(sprint => sprint.id_grupo === grupo);
          setSprints(filteredSprints);
        }else{
            console.error('La respuesta de la API no es un array:', response.data);
            setSprints([]);
        }
    }catch(error){
        console.error('Error al obtener los sprints:', error.response ? error.response.data : error.message);
        setSprints([]);
    }
  };

  useEffect(() => {
    fetchSprints();
    
  }, [grupo]);

  const obtenerGrupo = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setGrupo(user.grupoId);
      setTipoUsuario(user.userData.tipo_usuario);
    }else{
      console.error('Usuario no autenticado');
    }
  };

  const crearClick = () => {
    setNewSprintName('');
    setShowModal(true);
  };

  const editarClick = (id) => {
    const sprintEditar = sprints.find((sprint) => sprint.id === id);
    setNewSprintName(sprintEditar.numero_sprint);
    setSelectedSprint(sprintEditar);
    setShowEditModal(true);

  };

  const eliminarClick = (id) => {
    const sprintEditar = sprints.find((sprint) => sprint.id === id);
    setSelectedSprint(sprintEditar);
    setShowConfirmModal(true);
  };

  const handleSave = async () => {
    try{
        const response = await axios.post(`${API_BASE_URL}/sprints`, {
            numero_sprint: newSprintName,
            id_grupo: grupo
        });
        setSprints([...sprints, response.data.sprint]);
        setNewSprintName('');
        setShowModal(false);
    }catch(error){
        console.error('Error al guardar el sprint:', error);
    }
  }

  const handleEditSave = async() => {
    try{
        const response = await axios.patch(`${API_BASE_URL}/sprintsP/${selectedSprint.id}`, {
            numero_sprint: newSprintName
        });
        console.log ('Sprint editado correctamente:', response.data.sprint);
        setSprints(sprints.map(sprint => (sprint.id === selectedSprint.id ? response.data.sprint : sprint)));
        setShowEditModal(false);
    }catch(error){
        console.error('Error al guardar el sprint:', error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setShowEditModal(false);
    setShowConfirmModal(false);
  };

  const handleConfirmDelete = async () => {
    const id = selectedSprint.id;
    console.log('ID del sprint a eliminar:', id);
    try{
      await axios.delete(`${API_BASE_URL}/sprints/${id}`);
      
      console.log('Tarea eliminada correctamente');
      
    }catch(error){
      console.error('Error al eliminar la tarea:', error);
    }
    setSprints(sprints.filter(sprint => sprint.id !== id));
    setShowConfirmModal(false);
  };

  return (
    <div className="container" style={{  }}>
      
      <h2 className="text-center" style={{ color: 'black' }}>Sprints</h2>

      <div className="">
        <div className="d-flex align-items-center justify-content-between">
          <h4>Sprints: {5}</h4>
          <BotonAtras />
        </div>
        <div className="d-flex justify-content-center mt-3">
          {tipoUsuario === 2 &&(
          <button className="btn btn-primary" onClick={() => {crearClick();}} 
          style={{ backgroundColor: '#007BFF' }}>Agregar Sprint
          </button>
          )}
        </div>
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Número de Sprint</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
          {sprints.map((sprint, index) => (
            <tr key={sprint.id}>
              <td className="td_nombres">
                <Link to={`/historiaHU/${sprint.id}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
                  Sprint número "{sprint.numero_sprint}"
                </Link>
              </td>
              <td>
                {tipoUsuario === 2 && (
                  <>
                  <Button style={{ backgroundColor: '#09DDCC', color: 'black' }} className="btn-custom-warning" onClick={() => editarClick(sprint.id)}>
                    <BsPencilSquare />
                  </Button>
                  {' '}
                  <Button style={{ backgroundColor: 'red' }} className="btn-custom-danger" onClick={() => eliminarClick(sprint.id)}>
                    <BsTrashFill />
                  </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      <ModalAgregarSprint
                show={showModal}
                onClose={handleClose}
                newName={newSprintName}
                setNewName={setNewSprintName}
                handleSave={handleSave}
                titulo={"Agregar Sprint"}
      />

      <ModalEliminar
                show={showConfirmModal}
                onClose={handleClose}
                handleConfirmDelete={handleConfirmDelete}
                titulo={"el Sprint"}
      />

      <ModalAgregarSprint
                show={showEditModal}
                onClose={handleClose}
                newName={newSprintName}
                setNewName={setNewSprintName}
                handleSave={handleEditSave}
                titulo={"Editar Sprint"}
      />

      
    </div>
  );
}

export default Sprints;