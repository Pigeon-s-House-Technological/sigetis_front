import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AgregarHU from './AgregarHU';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';

function HistoriaHU() {
  const [historiasUsuario, setHistoriasUsuario] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', images: [] });
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistorias = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/historiaUsuarios');
        setHistoriasUsuario(response.data);
      } catch (error) {
        console.error("Error al obtener las historias:", error.response.data);
      }
    };

    fetchHistorias();
  }, []);

  const openModalForNewStory = () => {
    setEditIndex(null);
    setNewTask({ title: '', description: '', images: [] }); // Reinicia el estado para una nueva historia
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const saveStory = async () => {
    if (newTask.title.trim()) {
      if (editIndex !== null) {
        // Actualizar historia existente
        // (Aquí deberías implementar la lógica para actualizar en la API)
      } else {
        // Crear nueva historia
        try {
          const response = await axios.post('http://localhost:8000/api/historiaUsuarios', {
            titulo_hu: newTask.title,
            descripcion_hu: newTask.description,
            // Agrega otros campos si es necesario
          });
          setHistoriasUsuario([...historiasUsuario, response.data.message]); // Asegúrate de ajustar esto según tu respuesta
        } catch (error) {
          console.error("Error al crear la historia:", error.response.data);
        }
      }
      setNewTask({ title: '', description: '', images: [] });
      closeModal();
    }
  };

  const editStory = (index) => {
    setEditIndex(index);
    setNewTask(historiasUsuario[index]);
    setShowModal(true);
  };

  const deleteStory = async (index) => {
    const historia = historiasUsuario[index];
    try {
      await axios.delete(`http://localhost:8000/api/historiaUsuarios/${historia.id}`); // Asegúrate de que 'id' está disponible
      const updatedStories = historiasUsuario.filter((_, i) => i !== index);
      setHistoriasUsuario(updatedStories);
    } catch (error) {
      console.error("Error al eliminar la historia:", error.response.data);
    }
  };

  const viewStoryDetails = (index) => {
    navigate(`/detalle/${index}`, { state: { historia: historiasUsuario[index] } });
  };

  return (
    <div className="container mt-5" style={{ backgroundColor: '#215f88', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>HISTORIA DE USUARIO</h1>
        <button onClick={openModalForNewStory} className="btn btn-primary">
          + AGREGAR HU
        </button>
      </div>
      <div className="mb-3">
        <label>HISTORIA DE USUARIO</label>
      </div>

      <ul className="list-group">
        {historiasUsuario.map((historia, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <span onClick={() => viewStoryDetails(index)} style={{ cursor: 'pointer' }}>
              {historia.titulo_hu} {/* Asegúrate de usar el campo correcto */}
            </span>
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-basic">
                •••
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => editStory(index)}>Editar</Dropdown.Item>
                <Dropdown.Item onClick={() => deleteStory(index)}>Eliminar</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        ))}
      </ul>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? "Editar Historia de Usuario" : "Agregar Historia de Usuario"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AgregarHU newTask={newTask} setNewTask={setNewTask} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={saveStory}>
            {editIndex !== null ? "Actualizar" : "Crear"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HistoriaHU;
