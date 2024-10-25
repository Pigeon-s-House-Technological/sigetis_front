import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EvaluationForm.css';

const EvaluationForm = () => {
  const navigate = useNavigate();
  const [criterios, setCriterios] = useState([]);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    cargarCriterios();
  }, []);

  const cargarCriterios = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/criterios');
      const datos = Array.isArray(response.data) ? response.data : [];
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
      (criterio.preguntasOpcionMultiple || []).every(pregunta => responses[pregunta.id]) &&
      (criterio.preguntasPuntuacion || []).every(pregunta => responses[pregunta.id]) &&
      (criterio.preguntasComplemento || []).every(pregunta => responses[pregunta.id])
    );

    if (!allAnswered) {
      alert('Por favor, responda todas las preguntas.');
      return;
    }

    try {
      await Promise.all(
        criterios.flatMap(criterio => [
          ...(criterio.preguntasOpcionMultiple || []).map(pregunta => 
            guardarRespuestaOpcionMultiple(pregunta.id, responses[pregunta.id])
          ),
          ...(criterio.preguntasPuntuacion || []).map(pregunta => 
            guardarRespuestaPuntuacion(pregunta.id, responses[pregunta.id])
          ),
          ...(criterio.preguntasComplemento || []).map(pregunta => 
            guardarRespuestaComplemento(pregunta.id, responses[pregunta.id])
          ),
        ])
      );

      alert('Evaluación terminada y respuestas guardadas');
      navigate('/evaluacion');
    } catch (error) {
      console.error('Error al guardar las respuestas:', error);
      alert('Hubo un problema al guardar las respuestas. Inténtalo de nuevo.');
    }
  };

  const guardarRespuestaOpcionMultiple = async (preguntaId, respuestaId) => {
    const grupoEvaluacionId = 1; // Cambia esto según tu lógica de negocio
    return await axios.post('http://localhost:8000/api/respuestasOpcionMultiple', {
      id_opcion_pregunta_multiple: respuestaId,
      estado_respuesta_opcion_multiple: 1,
      id_grupo_evaluacion: grupoEvaluacionId,
    });
  };

  const guardarRespuestaPuntuacion = async (preguntaId, puntuacion) => {
    const grupoEvaluacionId = 1; // Cambia esto según tu lógica de negocio
    return await axios.post('http://localhost:8000/api/respuestasPuntuacion', {
      id_pregunta_puntuacion: preguntaId,
      respuesta_puntuacion: puntuacion,
      id_grupo_evaluacion: grupoEvaluacionId,
    });
  };

  const guardarRespuestaComplemento = async (preguntaId, respuesta) => {
    const grupoEvaluacionId = 1; // Cambia esto según tu lógica de negocio
    return await axios.post('http://localhost:8000/api/respuestasComplemento', {
      id_pregunta_complemento: preguntaId,
      respuesta_complemento: respuesta,
      id_grupo_evaluacion: grupoEvaluacionId,
    });
  };

  const handleResponseChange = (id, value) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [id]: value,
    }));
  };

  return (
    <div className="evaluation-form">
      <h2 className="evaluation-title">Evaluación Primer Sprint</h2>

      {criterios.length > 0 && criterios.map(criterio => (
        <div key={criterio.id} className="criterio-section">
          <h2>{criterio.titulo_criterio}</h2>

          {/* Renderiza preguntas de opción múltiple */}
          {criterio.preguntasOpcionMultiple && criterio.preguntasOpcionMultiple.length > 0 && (
            <div className="preguntas-section">
              <h3>Preguntas de Opción Múltiple</h3>
              {criterio.preguntasOpcionMultiple.map(pregunta => (
                <div className="criteria-section" key={pregunta.id}>
                  <h4 className="criteria-title">{pregunta.pregunta_opcion_multiple}</h4>
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
            </div>
          )}

          {/* Renderiza preguntas de puntuación */}
          {criterio.preguntasPuntuacion && criterio.preguntasPuntuacion.length > 0 && (
            <div className="preguntas-section">
              <h3>Preguntas de Puntuación</h3>
              {criterio.preguntasPuntuacion.map(pregunta => (
                <div className="criteria-section" key={pregunta.id}>
                  <h4 className="criteria-title">{pregunta.pregunta_puntuacion}</h4>
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
            </div>
          )}

          {/* Renderiza preguntas de complemento */}
          {criterio.preguntasComplemento && criterio.preguntasComplemento.length > 0 && (
            <div className="preguntas-section">
              <h3>Preguntas de Complemento</h3>
              {criterio.preguntasComplemento.map(pregunta => (
                <div className="criteria-section" key={pregunta.id}>
                  <h4 className="criteria-title">{pregunta.pregunta_complemento}</h4>
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
          )}
        </div>
      ))}

      <div className="buttons">
        <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
        <button className="submit-button" onClick={handleFinish}>Finalizar</button>
      </div>
    </div>
  );
};

export default EvaluationForm;