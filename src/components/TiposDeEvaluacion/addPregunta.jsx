import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../config';

import RatingCircles from '../RatingCircles';

const AddPregunta = ({ show, handleClose, fetchPreguntas }) => {
    const { id } = useParams();

    const [tipo, setTipo] = useState('complemento');
    const [pregunta, setPregunta] = useState('');
    const [opciones, setOpciones] = useState(['']);
    const [puntuacion, setPuntuacion] = useState('');
    const [error, setError] = useState('');

  const handleAddOption = () => {
    setOpciones([...opciones, '']);
  };

  const validateForm = () => {
    if (!pregunta) {
      setError('La pregunta es obligatoria.');
      return false;
    }
    if (tipo === 'opcionMultiple' && opciones.some(opcion => !opcion)) {
      setError('Todas las opciones deben estar completas.');
      return false;
    }
    if (tipo === 'puntuacion' && (!puntuacion || puntuacion <= 0 || puntuacion > 10)) {
      setError('Error de puntuacion.');
      return false;
    }
    setError('');
    return true;
  };

  const obtenerUltimoRegistro = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/preguntasOpcionMultiple`);
      const preguntas = response.data;
  
      if (preguntas.length === 0) {
        throw new Error('No se encontraron registros');
      }
  
      // Asumiendo que los IDs son incrementales y el último registro tiene el ID más alto
      const ultimaPregunta = preguntas.reduce((max, pregunta) => (pregunta.id > max.id ? pregunta : max), preguntas[0]);
  
      console.log('Última pregunta:', ultimaPregunta);
      return ultimaPregunta.id;
    } catch (error) {
      console.error('Error al obtener el último registro:', error);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOpciones = [...opciones];
    newOpciones[index] = value;
    setOpciones(newOpciones);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
        return;
    }
    try {
      let data = { pregunta, tipo, puntuacion, opciones };
      console.log(data);
      if (tipo === 'opcionMultiple') {
        data.id_criterio_evaluacion = parseInt(id);
        data.pregunta_opcion_multiple = pregunta;
        data.tipo_opcion_multiple = 0;
      } else if (tipo === 'puntuacion') {
        data.puntuacion = puntuacion;
        data.pregunta_puntuacion = pregunta;
        data.id_criterio_evaluacion = parseInt(id);
      } else if (tipo === 'complemento') {
        data.id_criterio_evaluacion = parseInt(id);
        data.pregunta_complemento = pregunta;
      }

      let url = '';
      switch (tipo) {
        case 'opcionMultiple':
          url = `${API_BASE_URL}/preguntasOpcionMultiple`;
          break;
        case 'complemento':
          url = `${API_BASE_URL}/preguntasComplemento`;
          break;
        case 'puntuacion':
          url = `${API_BASE_URL}/preguntasPuntuacion`;
          break;
        default:
          throw new Error('Tipo de pregunta desconocido');
      }
      await axios.post(url, data);

      

      const preguntaId = await obtenerUltimoRegistro();
      if(tipo === 'opcionMultiple') {
      const opcionesUrl = `${API_BASE_URL}/opcionesPreguntaMultiple`;
        for (const opcion_pregunta of opciones) {
            await axios.post(opcionesUrl, { id_pregunta_multiple: preguntaId, opcion_pregunta:opcion_pregunta });
        }
      }
    
      fetchPreguntas();
      handleClose();
      setPregunta('');
      setPuntuacion('');
      setOpciones(['']);
    } catch (error) {
      console.error('Error al agregar la pregunta:', error);
      if (error.response) {
        console.error('Detalles del error:', error.response.data);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Pregunta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTipoPregunta">
            <Form.Label>Tipo de Pregunta</Form.Label>
            <Form.Control as="select" value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                <option value="complemento">Complemento</option>
                <option value="opcionMultiple">Opción Múltiple</option>
                <option value="puntuacion">Puntuación</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formPregunta">
            <Form.Label>Pregunta</Form.Label>
            <Form.Control type="text" value={pregunta} onChange={(e) => setPregunta(e.target.value)} required />
          </Form.Group>

          {tipo === 'opcionMultiple' && (
            <Form.Group controlId="formOpciones">
              <Form.Label>Opciones</Form.Label>
              {opciones.map((opcion, index) => (
                <Form.Control
                  key={index}
                  type="text"
                  value={opcion}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
              ))}
              <Button style={{backgroundColor: '#215f88'}} variant="secondary" onClick={handleAddOption}>
                Agregar Opción
              </Button>
            </Form.Group>
          )}

          {tipo === 'puntuacion' && (
            <Form.Group controlId="formPuntuacion">
              <Form.Label>Puntuación</Form.Label>
              <Form.Control
                type="number"
                value={puntuacion}
                onChange={(e) => setPuntuacion(e.target.value)}
                required
              />
              <br />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <RatingCircles puntuacion={puntuacion} />
              </div>
            </Form.Group>
          )}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button style={{backgroundColor: '#215f88'}} variant="primary" type="submit">
                Agregar Pregunta
                </Button>
            </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPregunta;