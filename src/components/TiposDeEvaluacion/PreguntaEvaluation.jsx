import React, { useState, useEffect, useCallback } from 'react';
import { Button, Table } from 'react-bootstrap';
import { BsTrashFill, BsPencilSquare } from 'react-icons/bs';
import {  useParams } from 'react-router-dom';
import axios from 'axios';

import BotonAtras from '../General/BotonAtras';
import ModalEliminar from './Modal/ModalEliminar';
import './Evaluaciones.css';
import AddPregunta from './addPregunta';
import EditPreguntaModal from './EditPreguntaModal';
import { API_BASE_URL } from '../config'; // Asegúrate de que la ruta sea correcta


const PreguntaEvaluation = () => {

  const { id } = useParams();

  const [preguntasOpMul, setPreguntasOpMul] = useState([]);
  const [preguntasComp, setPreguntasComp] = useState([]);
  const [preguntasPunt, setPreguntasPunt] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTipo, setSelectedTipo] = useState('');
  const [selectedPreguntaId, setSelectedPreguntaId] = useState(null);
  const [selectedPregunta, setSelectedPregunta] = useState(null);
  const [nombreCriterio, setNombreCriterio] = useState('');

// Función para obtener los datos de la API
const fetchPreguntas = useCallback(async () => {
  try {
    const obtenerCriterio = await axios.get(`${API_BASE_URL}/criterios/${id}`);
    setNombreCriterio(obtenerCriterio.data.criterio_evaluacion.titulo_criterio);
    const response = await axios.get(`${API_BASE_URL}/preguntasOpcionMultiple`); 
    if(Array.isArray(response.data)) {
      const preguntasOpMul = response.data.filter(pregunta => pregunta.id_criterio_evaluacion === parseInt(id));
      setPreguntasOpMul(preguntasOpMul);
    }else{
      setPreguntasOpMul([]);
    }
    
    const response1 = await axios.get(`${API_BASE_URL}/preguntasPuntuacion`); 
    if(Array.isArray(response1.data)) {
      const preguntasPunt = response1.data.filter(pregunta => pregunta.id_criterio_evaluacion === parseInt(id));
      setPreguntasPunt(preguntasPunt);
    }else{
      setPreguntasPunt([]);
    }

    const response2 = await axios.get(`${API_BASE_URL}/preguntasComplemento`); 
    if(Array.isArray(response2.data)) {
      const preguntasComp = response2.data.filter(pregunta => pregunta.id_criterio_evaluacion === parseInt(id));
      setPreguntasComp(preguntasComp);
    }else{
      setPreguntasComp([]);
    }
  } catch (error) {
    console.error('Error al obtener los datos de la API', error);
  }
}, [id]);

// useEffect para obtener los datos de la API al cargar el componente
useEffect(() => {
  fetchPreguntas();
}, [fetchPreguntas]);

const handleClick = () => {
  setShowModal(true);
};

const handleClose = () => {
  setShowModal(false);
};

const eliminarClick = (pregunta, tipo) => {
  setSelectedPregunta({ pregunta, tipo });
  setShowConfirmModal(true);
};

const handleConfirmDelete = async () => {
  try {
    console.log(selectedPregunta);
    const { pregunta, tipo } = selectedPregunta;

    switch (tipo) {
      case 1:
        await axios.delete(`${API_BASE_URL}/preguntasOpcionMultiple/${pregunta}`);
        setPreguntasOpMul((prev) => prev.filter((p) => p.id !== pregunta));
        break;
      case 2:
        await axios.delete(`${API_BASE_URL}/preguntasComplemento/${pregunta}`);
        setPreguntasComp((prev) => prev.filter((p) => p.id !== pregunta));
        break;
      case 3:
        await axios.delete(`${API_BASE_URL}/preguntasPuntuacion/${pregunta}`);
        setPreguntasPunt((prev) => prev.filter((p) => p.id !== pregunta));
        break;
      default:
        throw new Error('Tipo de pregunta desconocido');
    }

    setShowConfirmModal(false);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error de Axios al eliminar la pregunta:', error.response?.data || error.message);
    } else {
      console.error('Error al eliminar la pregunta:', error.message);
    }
  }
};

const handleCloseConfirmModal = () => {
  setShowConfirmModal(false);
};

const editarClick = (preguntaId, tipo) => {
  setSelectedPreguntaId(preguntaId);
  setSelectedTipo(tipo);
  setShowEditModal(true);
};

const handleCloseEditModal = () => {
  setShowEditModal(false);
  setSelectedPreguntaId(null);
  setSelectedTipo('');
};

return (
  <div className='HomeAutoevaluacion'>
    <div className='row-home'>
      <h2 className='col col-h1'>{nombreCriterio}</h2>
      <div className='col col-h3'>
        <h4>{preguntasOpMul.length+preguntasComp.length+preguntasPunt.length} Preguntas</h4>
      </div>
      <div className='col col-button'>
        <Button style={{backgroundColor: '#007BFF'}} className="btn-custom-primary" onClick={handleClick}>Agregar Pregunta</Button>
        <AddPregunta show={showModal} handleClose={handleClose} fetchPreguntas={fetchPreguntas} />
        <BotonAtras />
      </div>
    </div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>tipo de Pregunta</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {preguntasOpMul.map((pregunta, index) => (
          <tr key={pregunta.id}>
            <td>{index + 1}</td>
            <td className="td_nombres">
              
                {pregunta.pregunta_opcion_multiple}
              
            </td>
            <td>Pregunta de opción multiple</td>
            <td>
              <Button style={{ backgroundColor: '#09DDCC', color: 'black' }} className="btn-custom-warning" onClick={() => editarClick(pregunta.id, 'opcionMultiple')}>
                <BsPencilSquare />
              </Button>
              {' '}
              <Button style={{ backgroundColor: 'red' }} className="btn-custom-danger" onClick={() => eliminarClick(pregunta.id, 1)}>
                <BsTrashFill />
              </Button>
            </td>
          </tr>
        ))}
        {preguntasComp.map((pregunta, index) => (
          <tr key={pregunta.id}>
            <td>{index + 1}</td>
            <td className="td_nombres">
              
                {pregunta.pregunta_complemento}
              
            </td>
            <td>Pregunta de complemento</td>
            <td>
              <Button style={{ backgroundColor: '#09DDCC', color: 'black' }} className="btn-custom-warning" onClick={() => editarClick(pregunta.id, 'complemento')}>
                <BsPencilSquare />
              </Button>
              {' '}
              <Button style={{ backgroundColor: 'red' }} className="btn-custom-danger" onClick={() => eliminarClick(pregunta.id, 2)}>
                <BsTrashFill />
              </Button>
            </td>
          </tr>
        ))}
        {preguntasPunt.map((pregunta, index) => (
          <tr key={pregunta.id}>
            <td>{index + 1}</td>
            <td className="td_nombres">
              
                {pregunta.pregunta_puntuacion}
              
            </td>
            <td>Pregunta de puntuación</td>
            <td>
              <Button style={{ backgroundColor: '#09DDCC', color: 'black' }} className="btn-custom-warning" onClick={() => editarClick(pregunta.id, 'puntuacion')}>
                <BsPencilSquare />
              </Button>
              {' '}
              <Button style={{ backgroundColor: 'red' }} className="btn-custom-danger" onClick={() => eliminarClick(pregunta.id, 3)}>
                <BsTrashFill />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>

    <ModalEliminar
                show={showConfirmModal}
                onClose={handleCloseConfirmModal}
                handleConfirmDelete={handleConfirmDelete}
      />

    <EditPreguntaModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        preguntaId={selectedPreguntaId}
        tipo={selectedTipo}
        fetchPreguntas={fetchPreguntas}
      />
  </div>
);
};

export default PreguntaEvaluation;