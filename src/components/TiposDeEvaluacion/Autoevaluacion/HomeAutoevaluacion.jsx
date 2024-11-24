import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { BsTrashFill, BsPencilSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ModalEliminar from '../Modal/ModalEliminar';
import ModalAgregar from '../Modal/ModalAgregar';
import '../../../assets/css/Autoevaluacion.css';
import '../Evaluaciones.css';
import { API_BASE_URL } from '../../config';


const HomeAutoevaluacion = () => {
  const [autoevaluaciones, setAutoevaluaciones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newEvaluationName, setNewEvaluationName] = useState('');
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [selectedEvaluationId, setSelectedEvaluationId] = useState(null);
  const [tipoEvaluacion, setTipoEvaluacion] = useState(false);

  // Función para obtener los datos de la API
  const fetchAutoevaluaciones = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/evaluaciones`); // Reemplaza con la URL de tu API
      const autoevaluacionesTipo1 = response.data.filter(evaluacion => evaluacion.tipo_evaluacion === 1);
      setAutoevaluaciones(autoevaluacionesTipo1);
    } catch (error) {
      console.error('Error al obtener los datos de la API', error);
    }
  };

  // useEffect para obtener los datos de la API al cargar el componente
  useEffect(() => {
    fetchAutoevaluaciones();
  }, []);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSave = async () => {
    
    try {
      const response = await axios.post(`${API_BASE_URL}/evaluaciones`, {
        nombre_evaluacion: newEvaluationName,
        tipo_evaluacion: 1, // Asegúrate de que el tipo de evaluación es 1
        tipo_destinatario: tipoEvaluacion // Ajusta este valor según sea necesario
      });
      
      setAutoevaluaciones([...autoevaluaciones, response.data]);
      fetchAutoevaluaciones();
      setNewEvaluationName('');
      setShowModal(false);
    } catch (error) {
      console.error('Error al guardar la nueva autoevaluación', error);
    }
  };

  const eliminarClick = (id) => {
    setSelectedEvaluationId(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/evaluaciones/${selectedEvaluationId}`);
      setAutoevaluaciones(autoevaluaciones.filter((autoevaluacion) => autoevaluacion.id !== selectedEvaluationId));
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Error al eliminar la autoevaluación', error);
    }
  };

  const handleCloseConfirmModal = () => {
    setNewEvaluationName('');
    setShowConfirmModal(false);
  };

  const editarClick = (id) => {
    const autoevaluacionEditar = autoevaluaciones.find((autoevaluacion) => autoevaluacion.id === id);
    setSelectedEvaluation(autoevaluacionEditar);
    setTipoEvaluacion(autoevaluacionEditar.tipo_destinatario);
    setNewEvaluationName(autoevaluacionEditar.nombre_evaluacion);
    setShowEditModal(true);
  };

  const handleEditSave = async () => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/evaluacionesP/${selectedEvaluation.id}`, {
        nombre_evaluacion: newEvaluationName,
        tipo_destinatario: tipoEvaluacion
      });
      // Actualizar el estado con la autoevaluación editada
      setAutoevaluaciones(autoevaluaciones.map((autoevaluacion) =>
        autoevaluacion.id === selectedEvaluation.id ? response.data : autoevaluacion
      ));
      fetchAutoevaluaciones();
      setNewEvaluationName('');
      setShowEditModal(false);
    } catch (error) {
      console.error('Error al editar la autoevaluación', error);
    } 
  };
  const handleCloseEditModal = () => {
    setNewEvaluationName('');
    setShowEditModal(false);
  };

  return (
    <div className='HomeAutoevaluacion'>
      <div className='row-home'>
        <h2 className='col col-h1'>Autoevaluaciones</h2>
        <div className='col col-h3'>
          <h4>{autoevaluaciones.length} Autoevaluaciones</h4>
        </div>
        <div className='col col-button'>
          <Button style={{backgroundColor: '#007BFF'}} className="btn-custom-primary" onClick={handleClick}>Agregar Autoevaluación</Button>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {autoevaluaciones.map((autoevaluacion, index) => (
            <tr key={autoevaluacion.id}>
              <td>{index + 1}</td>
              <td className="td_nombres">
                <Link to={`/gestionEvaluacion/${autoevaluacion.id}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
                  {autoevaluacion.nombre_evaluacion}
                </Link>
              </td>
              <td>
                {autoevaluacion.tipo_destinatario === true ? 'Grupal' : 'Individual'}
              </td>
              <td>
                <Button style={{ backgroundColor: '#09DDCC', color: 'black' }} className="btn-custom-warning" onClick={() => editarClick(autoevaluacion.id)}>
                  <BsPencilSquare />
                </Button>
                {' '}
                <Button style={{ backgroundColor: 'red' }} className="btn-custom-danger" onClick={() => eliminarClick(autoevaluacion.id)}>
                  <BsTrashFill />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ModalAgregar
                show={showModal}
                onClose={handleClose}
                newName={newEvaluationName}
                setNewName={setNewEvaluationName}
                handleSave={handleSave}
                titulo={"Agregar Evaluación"}
                autoevaluacion={true}
                setTipoEvaluacion={setTipoEvaluacion}
                tipoEvaluacion={tipoEvaluacion}
      />

      <ModalEliminar
                show={showConfirmModal}
                onClose={handleCloseConfirmModal}
                handleConfirmDelete={handleConfirmDelete}
      />

      <ModalAgregar
                show={showEditModal}
                onClose={handleCloseEditModal}
                newName={newEvaluationName}
                setNewName={setNewEvaluationName}
                handleSave={handleEditSave}
                titulo="Editar Evaluación"
                autoevaluacion={true}
                setTipoEvaluacion={setTipoEvaluacion}
                tipoEvaluacion={tipoEvaluacion}
      />
    </div>
  );
};

export default HomeAutoevaluacion;