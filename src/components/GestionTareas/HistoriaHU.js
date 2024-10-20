import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
import {API_BASE_URL} from '../config';

import './Modales/Modal.css';
import ModalAgregar from "../TiposDeEvaluacion/Modal/ModalAgregar";
import ModalEliminar from "../TiposDeEvaluacion/Modal/ModalEliminar";


const endPoint = `${API_BASE_URL}/historiaUsuarios`;
function HistoriaHU() {
  const [historiasUsuario, setHistoriasUsuario] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // Definir showEditModal y setShowEditModal
  const [newHistoriaName, setNewHistoriaName] = useState('');
  const [selectedHistoria, setSelectedHistoria] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedHistoriaId, setSelectedHistoriaId] = useState(null);
  const navigate = useNavigate();

  const fetchHistorias = async () => {
    try {
      const response = await axios.get(endPoint);
      if (Array.isArray(response.data)) {
        setHistoriasUsuario(response.data);
      } else {
        console.error("La respuesta de la API no es un array:", response.data);
        setHistoriasUsuario([]);
      }
    } catch (error) {
      console.error("Error al obtener las historias:", error.response ? error.response.data : error.message);
      setHistoriasUsuario([]);
    }
  };

  useEffect(() => {
    fetchHistorias();
  }, []);

  const closeModal = () => {
    setShowModal(false);
    setShowEditModal(false);
  };

  const handleSave = async () => {
    try {

      if (!newHistoriaName) {
        console.error('El nombre de la historia es requerido');
        return;
      }
      const data = {
        titulo_hu: newHistoriaName,
        id_sprint: 1, // Asegúrate de que el id_sprint es correcto
      };
  
      console.log('Datos enviados:', data);
  
      const response = await axios.post(`${API_BASE_URL}/historiaUsuarios`, data);
      // Actualizar el estado con la nueva autoevaluación
      setHistoriasUsuario([...historiasUsuario, response.data]);
      fetchHistorias();
      setNewHistoriaName('');
      setShowModal(false);
    } catch (error) {
      console.error('Error al guardar la nueva hu', error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!newHistoriaName) {
        console.error('El nombre de la historia es requerido');
        return;
      }

      const data = {
        titulo_hu: newHistoriaName,
        id_sprint: selectedHistoria.id_sprint,
      };

      const response = await axios.put(`${API_BASE_URL}/historiaUsuarios/${selectedHistoria.id}`, data);

      const updatedHistorias = historiasUsuario.map((historia) =>
        historia.id === selectedHistoria.id ? response.data : historia
      );

      setHistoriasUsuario(updatedHistorias);
      fetchHistorias();
      setNewHistoriaName('');
      setShowEditModal(false);
    } catch (error) {
      if (error.response) {
        console.error('Error al actualizar la hu', error.response.data);
      } else {
        console.error('Error al actualizar la hu', error.message);
      }
    }
  };

  const eliminarClick = (id) => {
    setSelectedHistoriaId(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/historiaUsuarios/${selectedHistoriaId}`);
      setHistoriasUsuario(historiasUsuario.filter((historiaHU) => historiaHU.id !== selectedHistoriaId));
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Error al eliminar la autoevaluación', error);
    }
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const viewStoryDetails = (index) => {
    navigate(`/detalle/${index}`, { state: { historia: historiasUsuario[index] } });
  };

  const openModalForNewStory = () => {
    setSelectedHistoria(null);
    setNewHistoriaName('');
    setShowModal(true);
  };

  const openModalForEditStory = (index) => {
    setSelectedHistoria(historiasUsuario[index]);
    setNewHistoriaName(historiasUsuario[index].titulo_hu);
    setShowEditModal(true);
  };

  return (
    <div className="container mt-5" style={{ backgroundColor: '#215f88', color: 'white', padding: '10px 20px', borderRadius: '5px' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>HISTORIA DE USUARIO</h1>
        <button onClick={openModalForNewStory} className="btn btn-primary" style={{backgroundColor:"#09DDCC", color:"black"}}>AGREGAR HU</button>
      </div>
      <ul className="list-group">
        {historiasUsuario.map((historia, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <span onClick={() => viewStoryDetails(historia.id)} style={{ cursor: 'pointer' }}>
              {historia.titulo_hu}
            </span>
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-basic">•••</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => openModalForEditStory(historia.id)}>Editar</Dropdown.Item>
                <Dropdown.Item onClick={() => eliminarClick(historia.id)}>Eliminar</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        ))}
      </ul>

      <ModalAgregar
                show={showModal}
                onClose={closeModal}
                newName={newHistoriaName}
                setNewName={setNewHistoriaName}
                handleSave={handleSave}
                titulo={"Agregar Historia de Usuario"}
      />

      <ModalEliminar
                show={showConfirmModal}
                onClose={handleCloseConfirmModal}
                handleConfirmDelete={handleConfirmDelete}
      />

      <ModalAgregar
                show={showEditModal}
                onClose={closeModal}
                newName={newHistoriaName}
                setNewName={setNewHistoriaName}
                handleSave={handleUpdate}
                titulo={"Editar Historia de Usuario"}
      />
    </div>
  );
}

export default HistoriaHU;