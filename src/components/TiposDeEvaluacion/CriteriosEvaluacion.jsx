import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form} from 'react-bootstrap';
import { BsTrashFill, BsPencilSquare } from 'react-icons/bs';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import './Evaluaciones.css';


const API_BASE_URL = 'http://127.0.0.1:8000/api';
const CriteriosEvaluacion = () => {
    const { id } = useParams();

    const [criterios, setCriterios] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newCriterioName, setNewCriterioName] = useState('');
    const [selectedCriterio, setSelectedCriterio] = useState(null);
    const [selectedCriterioId, setSelectedCriterioId] = useState(null);
    const navigate = useNavigate();

  // Función para obtener los datos de la API
  const fetchCriterios = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/criterios`); // Reemplaza con la URL de tu API
      const criteriosFiltrado = response.data.filter(criterio => criterio.id_evaluacion === parseInt(id));
      setCriterios(criteriosFiltrado);
    } catch (error) {
      console.error('Error al obtener los datos de la API', error);
    }
  };

  // useEffect para obtener los datos de la API al cargar el componente
  useEffect(() => {
    fetchCriterios();
  }, []);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/criterios`, {
        titulo_criterio: newCriterioName,
        id_evaluacion: parseInt(id), // Asegúrate de que el tipo de evaluación es 1
      });
      // Actualizar el estado con la nueva autoevaluación
      setCriterios([...criterios, response.data]);
      fetchCriterios();
      setNewCriterioName('');
      setShowModal(false);
    } catch (error) {
      console.error('Error al guardar la nueva autoevaluación', error);
    }
  };

  const handleBack = () => {
    navigate(-1); // Navegar a la página anterior
  };

  const eliminarClick = (id) => {
    setSelectedCriterioId(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/criterios/${selectedCriterioId}`);
      setCriterios(criterios.filter((criterio) => criterio.id !== selectedCriterioId));
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Error al eliminar la autoevaluación', error);
    }
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const editarClick = (id) => {
    const criterioEditar = criterios.find((criterio) => criterio.id === id);
    setSelectedCriterio(criterioEditar);
    setNewCriterioName(criterioEditar.titulo_criterio);
    setShowEditModal(true);
  };

  const handleEditSave = async () => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/criteriosP/${selectedCriterio.id}`, {
        titulo_criterio: newCriterioName,
      });
      // Actualizar el estado con la autoevaluación editada
      setCriterios(criterios.map((criterio) =>
        criterio.id === selectedCriterio.id ? response.data : criterio
      ));
      fetchCriterios();
      setNewCriterioName('');
      setShowEditModal(false);
    } catch (error) {
      console.error('Error al editar la autoevaluación', error);
    } 
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className='HomeAutoevaluacion'>
      <div className='row-home'>
        <h2 className='col col-h1'>Criterios</h2>
        <div className='col col-h3'>
          <h4>{criterios.length} criterios</h4>
        </div>
        
        <div className='col col-button'>
          <div className='button-group'>
            <Button style={{backgroundColor: '#215f88'}} className="btn-custom-primary" onClick={handleClick}>Agregar Criterio</Button>
            <Button className="boton_atras" onClick={handleBack} style={{ marginLeft: '10px', backgroundColor:'#09DDCC', color:'black'}}>
              <FaArrowLeft />
            </Button>
          </div>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {criterios.map((criterio, index) => (
            <tr key={criterio.id}>
              <td>{index + 1}</td>
              <td className="td_nombres">
                <Link to={`/criterio/${criterio.id}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
                  {criterio.titulo_criterio}
                </Link>
              </td>
              <td>
                <Button style={{ backgroundColor: '#09DDCC', color: 'black' }} className="btn-custom-warning" onClick={() => editarClick(criterio.id)}>
                  <BsPencilSquare />
                </Button>
                {' '}
                <Button style={{ backgroundColor: 'red' }} className="btn-custom-danger" onClick={() => eliminarClick(criterio.id)}>
                  <BsTrashFill />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Criterio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEvaluationName">
              <Form.Label>Nombre del Criterio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre de la evaluación"
                value={newCriterioName}
                onChange={(e) => setNewCriterioName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{backgroundColor: '#09DDCC', color: 'black'}} className="btn-custom-secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button  style={{backgroundColor: '#215F88'}} className="btn-custom-primary" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este criterio?
        </Modal.Body>
        <Modal.Footer>
          <Button style={{backgroundColor: '#09DDCC', color: 'black'}}  className="btn-custom-secondary" onClick={handleCloseConfirmModal}>
            Cancelar
          </Button>
          <Button style={{backgroundColor: 'red'}} className="btn-custom-danger" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Criterio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEditEvaluationName">
              <Form.Label>Nombre del Criterio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el nuevo nombre de la evaluación"
                value={newCriterioName}
                onChange={(e) => setNewCriterioName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{backgroundColor: '#09DDCC', color: 'black'}} className="btn-custom-secondary" onClick={handleCloseEditModal}>
            Cancelar
          </Button>
          <Button style={{backgroundColor: '#215F88'}} className="btn-custom-primary" onClick={handleEditSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CriteriosEvaluacion;