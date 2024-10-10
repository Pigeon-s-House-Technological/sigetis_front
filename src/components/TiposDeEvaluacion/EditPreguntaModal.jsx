import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { API_BASE_URL } from '../config'; // Asegúrate de que la ruta sea correcta
import RatingCircles from '../RatingCircles';

const EditPreguntaModal = ({ show, handleClose, preguntaId, tipo, fetchPreguntas }) => {
  const [pregunta, setPregunta] = useState('');
  const [puntuacion, setPuntuacion] = useState('');
  const [opciones, setOpciones] = useState(['']);

  useEffect(() => {
    if (preguntaId) {
      // Cargar los datos de la pregunta
      const fetchPregunta = async () => {
        try {
          let url = '';
          switch (tipo) {
            case 'opcionMultiple':
              url = `${API_BASE_URL}/preguntasOpcionMultiple/${preguntaId}`;
              const response = await axios.get(url);
              const data = response.data;
              const opcionesResponse = await axios.get(`${API_BASE_URL}/opcionesPreguntaMultiple`)
              const opcionesFiltradas = opcionesResponse.data.filter(opcion => opcion.id_pregunta_multiple === preguntaId);
              setPregunta(data.pregunta_opcion_multiple || '');
              setOpciones(opcionesFiltradas.map(opcion => opcion.opcion_pregunta) || ['']);
              break;
            case 'complemento':
              url = `${API_BASE_URL}/preguntasComplemento/${preguntaId}`;
              const response1 = await axios.get(url);
              const data1 = response1.data;
              setPregunta(data1.pregunta_complemento || '');
              break;
            case 'puntuacion':
              url = `${API_BASE_URL}/preguntasPuntuacion/${preguntaId}`;
              const response2 = await axios.get(url);
              const data2 = response2.data;
              setPregunta(data2.pregunta_puntuacion || '');
              setPuntuacion(data2.puntuacion || '');
              break;
            default:
              throw new Error('Tipo de pregunta desconocido');
          }

        } catch (error) {
          console.error('Error al cargar la pregunta:', error);
        }
      };

      fetchPregunta();
    }
  }, [preguntaId, tipo]);

  const handleSave = async () => {
    try {
      let data = { tipo };
      if (tipo === 'opcionMultiple') {
        data.pregunta_opcion_multiple = pregunta;
      } else if (tipo === 'puntuacion') {
        data.puntuacion = puntuacion;
        data.pregunta_puntuacion = pregunta;
      } else if (tipo === 'complemento') {
        data.pregunta_complemento = pregunta;
      }
      
      let url = '';
      switch (tipo) {
        case 'opcionMultiple':
          url = `${API_BASE_URL}/preguntasOpcionMultipleP/${preguntaId}`;
          await axios.patch(url, { pregunta_opcion_multiple: data.pregunta_opcion_multiple });
            
          break;
        case 'complemento':
          url = `${API_BASE_URL}/preguntasComplementoP/${preguntaId}`;
          console.log(url);
          console.log({ pregunta_complemento: data.pregunta_complemento });
          await axios.patch(url, { pregunta_complemento: data.pregunta_complemento });
          break;
        case 'puntuacion':
          url = `${API_BASE_URL}/preguntasPuntuacionP/${preguntaId}`;
          await axios.patch(url, data);
          break;
        default:
          throw new Error('Tipo de pregunta desconocido');
      }

      

      fetchPreguntas();
      handleClose();
    } catch (error) {
      console.error('Error al guardar la pregunta:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Pregunta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formPregunta">
            <Form.Label>Pregunta</Form.Label>
            <Form.Control
              type="text"
              value={pregunta}
              onChange={(e) => setPregunta(e.target.value)}
            />
          </Form.Group>
          {tipo === 'puntuacion' && (
            <Form.Group controlId="formPuntuacion">
              <Form.Label>Puntuación</Form.Label>
              <Form.Control
                type="number"
                value={puntuacion}
                onChange={(e) => setPuntuacion(e.target.value)}
              />
              <br />

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <RatingCircles puntuacion={puntuacion} />
              </div>
            </Form.Group>
          )}
          {tipo === 'opcionMultiple' && (
            <Form.Group controlId="formOpciones">
              <Form.Label>Opciones</Form.Label>
              {opciones.map((opcion, index) => (
                <Form.Control
                key={index}
                type="text"
                value={opcion}
                readOnly
              />
              ))}
            </Form.Group>
          )}
          {tipo === 'complemento' && (
            <Form.Group controlId="formCriterioEvaluacion">
              
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{backgroundColor: '#09DDCC', color:'black'}} variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button style={{backgroundColor: '#215f88'}} variant="primary" onClick={handleSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPreguntaModal;