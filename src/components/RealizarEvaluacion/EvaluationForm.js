import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './EvaluationForm.css';
import { API_BASE_URL } from '../config';

const EvaluationForm = () => {
  const navigate = useNavigate();
  const [criterios, setCriterios] = useState([]);
  const [respuestas, setResponses] = useState({});
  const { state } = useLocation();
  const evaluacionId = state.id;
  const idAsignacion = state.idAsignacion;

  useEffect(() => {
    cargarCriterios();
  }, []);

  const cargarCriterios = async () => {
    try {
      console.log('idAsignacion', idAsignacion);
      const response = await axios.get(`${API_BASE_URL}/listarPreguntas/${evaluacionId}`);
      const datos = response.data.evaluacion.criterios || [];
      setCriterios(datos);
    } catch (error) {
      console.error('Error al obtener los criterios:', error);
      setCriterios([]);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleFinish = async () => {
    const allAnswered = criterios.every(criterio =>
      (criterio.pregunta_opcion_multiple || []).every(pregunta => respuestas[pregunta.id]) &&
      (criterio.pregunta_puntuacion || []).every(pregunta => respuestas[pregunta.id]) &&
      (criterio.pregunta_complemento || []).every(pregunta => respuestas[pregunta.id])
    );

    if (!allAnswered) {
      alert('Por favor, responda todas las preguntas.');
      return;
    }
    if (state.onFinish) {
      state.onFinish(evaluacionId);
    }
    try {
      const promises = [];

      criterios.forEach(criterio => {
        (criterio.pregunta_opcion_multiple || []).forEach(pregunta => {
          const respuestaId = respuestas[pregunta.id];
          if (respuestaId) {
            promises.push(guardarRespuestaOpcionMultiple(pregunta.id, respuestaId));
          }
        });
        (criterio.pregunta_puntuacion || []).forEach(pregunta => {
          const puntuacion = respuestas[pregunta.id];
          if (puntuacion) {
            promises.push(guardarRespuestaPuntuacion(pregunta.id, puntuacion));
          }
        });
        (criterio.pregunta_complemento || []).forEach(pregunta => {
          const respuesta = respuestas[pregunta.id];
          if (respuesta) {
            promises.push(guardarRespuestaComplemento(pregunta.id, respuesta));
          }
        });
      });
      promises.push(axios.patch(`${API_BASE_URL}/asignacionesP/${idAsignacion}`, {
        estado_evaluacion: true // Cambia esto según el estado que desees establecer
      }));
      await Promise.all(promises);
      alert('Evaluación terminada y respuestas guardadas');
      navigate('/evaluacion');
    } catch (error) {
      console.error('Error al guardar las respuestas:', error);
      alert('Hubo un problema al guardar las respuestas. Inténtalo de nuevo.');
    }
  };

  const guardarRespuestaOpcionMultiple = async (preguntaId, respuestaId) => {
    const idOpcion = Number(respuestaId);

    if (isNaN(idOpcion)) {
      throw new Error("respuestaId debe ser un número válido");
    }

    return await axios.post(`${API_BASE_URL}/respuestasOpcionMultiple`, {
      id_opcion_pregunta_multiple: idOpcion,
      estado_respuesta_opcion_multiple: 1,
      id_grupo_evaluacion: idAsignacion,
    });
  };

  const guardarRespuestaPuntuacion = async (preguntaId, puntuacion) => {
    const idPregunta = Number(preguntaId);
    const idPuntuacion = Number(puntuacion);

    if (isNaN(idPregunta) || isNaN(idPuntuacion)) {
      throw new Error("preguntaId y puntuacion deben ser números válidos");
    }

    if (idPuntuacion < 1 || idPuntuacion > 5) {
      throw new Error("puntuacion debe estar entre 1 y 5");
    }

    return await axios.post(`${API_BASE_URL}/respuestasPuntuacion`, {
      id_pregunta_puntuacion: idPregunta,
      respuesta_puntuacion: idPuntuacion,
      id_grupo_evaluacion: idAsignacion,
    });
  };

  const guardarRespuestaComplemento = async (preguntaId, respuesta) => {
    return await axios.post(`${API_BASE_URL}/respuestasComplemento`, {
      id_pregunta_complemento: preguntaId,
      respuesta_complemento: respuesta,
      id_grupo_evaluacion: idAsignacion,
    });
  };

  const handleResponseChange = (id, valor) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [id]: valor,
    }));
  };

  return (
    <div className="evaluation-form">
      <h2 className="evaluation-title">Evaluación</h2>

      {criterios.length > 0 && criterios.map(criterio => (
        <div key={criterio.id} className="criterio-section">
          <h2 className="criterio-title">{criterio.titulo_criterio}</h2>

          {/* Renderiza preguntas de opción múltiple */}
          {criterio.pregunta_opcion_multiple && criterio.pregunta_opcion_multiple.length > 0 && criterio.pregunta_opcion_multiple.map(pregunta => (
            <div className="criteria-section" key={pregunta.id}>
              <h3 className="criteria-title">{pregunta.pregunta_opcion_multiple}</h3>
              <div className="question">
                <p>Seleccione una opción:</p>
                <div className="vertical-options">
                  {(pregunta.opciones || []).map((opcion, idx) => (
                    <label key={idx} style={{ display: 'block' }}>
                      <input
                        type="radio"
                        name={`opcion_${pregunta.id}`}
                        value={opcion.id}
                        onChange={() => handleResponseChange(pregunta.id, opcion.id)}
                      /> {opcion.opcion_pregunta}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Renderiza preguntas de puntuación */}
          {criterio.pregunta_puntuacion && criterio.pregunta_puntuacion.length > 0 && criterio.pregunta_puntuacion.map(pregunta => (
            <div className="criteria-section" key={pregunta.id}>
              <h3 className="criteria-title">{pregunta.pregunta_puntuacion}</h3>
              <div className="question">
                <p>Califique del 1 al 5:</p>
                <div className="scale-options">
                  {[1, 2, 3, 4, 5].map(value => (
                    <label key={value}>
                      {value} <input
                        type="radio"
                        name={`puntuacion_${pregunta.id}`}
                        value={value}
                        onChange={() => handleResponseChange(pregunta.id, value)}
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Renderiza preguntas de complemento */}
          {criterio.pregunta_complemento && criterio.pregunta_complemento.length > 0 && criterio.pregunta_complemento.map(pregunta => (
            <div className="criteria-section" key={pregunta.id}>
              <h3 className="criteria-title">{pregunta.pregunta_complemento}</h3>
              <div className="question">
                <input
                  type="text"
                  className="text-input"
                  placeholder="Respuesta..."
                  onChange={(e) => handleResponseChange(pregunta.id, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="buttons">
        <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
        <button className="enviar-button" onClick={handleFinish}>Finalizar</button>
      </div>
    </div>
  );
};

export default EvaluationForm;