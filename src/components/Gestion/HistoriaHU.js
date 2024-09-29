import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AgregarHU from './AgregarHU';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';

const endPoint = 'http://localhost:8000/api/historiaUsuarios';

function HistoriaHU() {
  const [historiasUsuario, setHistoriasUsuario] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', images: [] });
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistorias = async () => {
      try {
        const response = await axios.get(endPoint);
        setHistoriasUsuario(response.data);
      } catch (error) {
        console.error("Error al obtener las historias:", error.response.data);
      }
    };
    fetchHistorias();
  }, []);

  const openModalForNewStory = () => {
    setEditIndex(null);
    setNewTask({ title: '', description: '', images: [] });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const saveStory = async () => {
    if (newTask.title.trim()) {
      const formData = new FormData();
      formData.append('titulo_hu', newTask.title);
      formData.append('descripcion_hu', newTask.description);
      newTask.images.forEach((image) => {
        formData.append('images[]', image);
      });

      try {
        if (editIndex !== null) {
          const historia = historiasUsuario[editIndex];
          const response = await axios.put(`${endPoint}/${historia.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          const updatedHistorias = [...historiasUsuario];
          updatedHistorias[editIndex] = response.data;
          setHistoriasUsuario(updatedHistorias);
        } else {
          const response = await axios.post(endPoint, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setHistoriasUsuario([...historiasUsuario, response.data]);
        }
        setNewTask({ title: '', description: '', images: [] });
        closeModal();
      } catch (error) {
        console.error("Error al guardar la historia:", error.response.data);
      }
    }
  };

  const editStory = (index) => {
    setEditIndex(index);
    setNewTask({
      title: historiasUsuario[index].titulo_hu || '',
      description: historiasUsuario[index].descripcion_hu || '',
    });
    setShowModal(true);
  };

  const deleteStory = async (index) => {
    const historia = historiasUsuario[index];
    try {
      await axios.delete(`${endPoint}/${historia.id}`);
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
    <div className="container mt-5" style={{ backgroundColor: '#215f88', color: 'white', padding: '10px 20px', borderRadius: '5px' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>HISTORIA DE USUARIO</h1>
        <button onClick={openModalForNewStory} className="btn btn-primary">+ AGREGAR HU</button>
      </div>
      <ul className="list-group">
        {historiasUsuario.map((historia, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <span onClick={() => viewStoryDetails(index)} style={{ cursor: 'pointer' }}>
              {historia.titulo_hu}
            </span>
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-basic">•••</Dropdown.Toggle>
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
          <AgregarHU 
            newTask={newTask} 
            setNewTask={setNewTask} 
            isEditMode={editIndex !== null} 
            taskId={editIndex !== null ? historiasUsuario[editIndex].id : null} 
            saveStory={saveStory} // Agrega esta línea
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Cerrar</Button>
          <Button variant="primary" onClick={saveStory}>{editIndex !== null ? "Actualizar" : "Crear"}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HistoriaHU;