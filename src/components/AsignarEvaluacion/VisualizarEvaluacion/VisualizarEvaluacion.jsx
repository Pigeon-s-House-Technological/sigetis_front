import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import './VisualizarEvaluacion.css'; // Asegúrate de importar el archivo CSS

const VisualizarEvaluacion = ({ idAsignacion, show, handleClose }) => {
  const [evaluacion, setEvaluacion] = useState(null);

  useEffect(() => {
    if (show) {
      cargarRespuestas();
    }
  }, [show]);

  const cargarRespuestas = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/listarRespuestas/${idAsignacion}`);
      setEvaluacion(response.data.asignacion.evaluacion);
    } catch (error) {
      console.error('Error al obtener las respuestas:', error);
    }
  };

  return (
    <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-x1" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Respuestas de la Evaluación</h5>
            <button type="button" className="close" onClick={handleClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {evaluacion ? (
              <div className="evaluation-details">
                <h2>{evaluacion.nombre_evaluacion}</h2>
                {evaluacion.criterios.map(criterio => (
                  <div key={criterio.id} className="criterio-section">
                    <h3>{criterio.titulo_criterio}</h3>

                    {/* Renderiza preguntas de opción múltiple */}
                    {criterio.pregunta_opcion_multiple && criterio.pregunta_opcion_multiple.length > 0 && criterio.pregunta_opcion_multiple.map(pregunta => (
                      <div key={pregunta.id} className="question-section">
                        <h4>{pregunta.pregunta_opcion_multiple}</h4>
                        <ul>
                          {pregunta.opciones.map(opcion => (
                            <li key={opcion.id}>
                              {opcion.opcion_pregunta} - {opcion.respuestas.length > 0 ? 'Seleccionada' : 'No seleccionada'}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {/* Renderiza preguntas de puntuación */}
                    {criterio.pregunta_puntuacion && criterio.pregunta_puntuacion.length > 0 && criterio.pregunta_puntuacion.map(pregunta => (
                      <div key={pregunta.id} className="question-section">
                        <h4>{pregunta.pregunta_puntuacion}</h4>
                        <p>Puntuación: {pregunta.respuestas.length > 0 ? pregunta.respuestas[0].respuesta_puntuacion : 'No respondida'}</p>
                      </div>
                    ))}

                    {/* Renderiza preguntas de complemento */}
                    {criterio.pregunta_complemento && criterio.pregunta_complemento.length > 0 && criterio.pregunta_complemento.map(pregunta => (
                      <div key={pregunta.id} className="question-section">
                        <h4>{pregunta.pregunta_complemento}</h4>
                        <p>Respuesta: {pregunta.respuestas.length > 0 ? pregunta.respuestas[0].respuesta_complemento : 'No respondida'}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <p>Cargando respuestas...</p>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizarEvaluacion;