import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EvaluationForm.css';

const EvaluationForm = () => {
  const navigate = useNavigate();

  const opcionMultipleQuestion = {
    id: 1,
    pregunta_opcion_multiple: "Pregunta 1: Opción múltiple (Selecciona uno)"
  };
  const puntuacionQuestion = {
    id: 1,
    pregunta_puntuacion: "Pregunta 2: Escala de satisfacción "
  };
  const complementoQuestion = {
    id: 1,
    pregunta_complemento: "Pregunta de complemento"
  };
  const [opcionMultipleOptions] = useState([
    "Opcion 1", 
    "Opcion 2", 
    "Opcion 3", 
    "Opcion 4",
    "Opcion 5"
  ]);

  const [responses, setResponses] = useState({
    opcionMultiple: '',
    puntuacion: '',
    complemento: ''
  });

  const handleCancel = () => {
    navigate(-1);
  };

  const handleFinish = () => {
    localStorage.setItem('isDelivered', 'true');
    console.log('Responses:', responses);
    navigate('/evaluacion');
  };

  const handleResponseChange = (type, value) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [type]: value
    }));
  };

  return (
    <div className="evaluation-form">
      <h2 className="evaluation-title">Evaluacion Primer Sprint</h2>
      {/* Pregunta: Opción Múltiple */}
      <div className="criteria-section">
        <h3 className="criteria-title">Criterio: Habilidades</h3>
        <div className="question">
          <p>{opcionMultipleQuestion.pregunta_opcion_multiple}</p>
          <div className="vertical-options"> {/* Aplicamos clase aquí */}
            {opcionMultipleOptions.map((opcion, idx) => (
              <label key={idx} style={{ display: 'block' }}> {/* Mostrar opciones en vertical */}
                <input
                  type="radio"
                  name="opcionMultiple"
                  value={opcion}
                  onChange={() => handleResponseChange('opcionMultiple', opcion)}
                /> {opcion}
              </label>
            ))}
          </div>
        </div>
      </div>
      {/* Pregunta: Puntuación */}
      <div className="criteria-section">
        <div className="question">
          <p>{puntuacionQuestion.pregunta_puntuacion}</p>
          <div className="scale-options">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value}>
                {value} <input
                  type="radio"
                  name="puntuacion"
                  value={value}
                  onChange={() => handleResponseChange('puntuacion', value)}
                />
              </label>
            ))}
          </div>
        </div>
      </div>
      {/* Pregunta: Complemento */}
      <div className="criteria-section">
        <div className="question">
          <p>{complementoQuestion.pregunta_complemento}</p>
          <input
            type="text"
            className="text-input"
            placeholder="Respuesta..."
            onChange={(e) => handleResponseChange('complemento', e.target.value)}
          />
        </div>
      </div>
      {/* Botones de Cancelar y Finalizar */}
      <div className="buttons">
        <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
        <button className="submit-button" onClick={handleFinish}>Finalizar</button>
      </div>
    </div>
  );
};

export default EvaluationForm;
