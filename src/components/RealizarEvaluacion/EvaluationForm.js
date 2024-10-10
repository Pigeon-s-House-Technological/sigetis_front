import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EvaluationForm.css';  // Archivo de estilos

const EvaluationForm = () => {
  const navigate = useNavigate();  

  const [complementoQuestions, setComplementoQuestions] = useState([]);
  const [opcionMultipleQuestions, setOpcionMultipleQuestions] = useState([]);
  const [opcionMultipleOptions, setOpcionMultipleOptions] = useState({});
  const [puntuacionQuestions, setPuntuacionQuestions] = useState([]);

  const handleCancel = () => {
    navigate(-1);  
  };

  const handleFinish = () => {
    localStorage.setItem('isDelivered', 'true');
    navigate('/evaluacion');
  };

  // Fetch de las preguntas y opciones desde los endpoints de la API
  useEffect(() => {
    const fetchComplementoQuestions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/preguntasComplemento');
        const data = await response.json();
        setComplementoQuestions(data);
      } catch (error) {
        console.error("Error fetching complemento questions", error);
      }
    };

    const fetchOpcionMultipleQuestions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/preguntasOpcionMultiple');
        const data = await response.json();
        setOpcionMultipleQuestions(data);
      } catch (error) {
        console.error("Error fetching opcion multiple questions", error);
      }
    };

    const fetchOpcionMultipleOptions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/opcionesPreguntaMultiple');
        const data = await response.json();
        const groupedOptions = data.reduce((acc, option) => {
          const { id_pregunta_multiple, opcion_pregunta } = option;
          if (!acc[id_pregunta_multiple]) {
            acc[id_pregunta_multiple] = [];
          }
          acc[id_pregunta_multiple].push(opcion_pregunta);
          return acc;
        }, {});
        setOpcionMultipleOptions(groupedOptions);
      } catch (error) {
        console.error("Error fetching opcion multiple options", error);
      }
    };

    const fetchPuntuacionQuestions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/preguntasPuntuacion');
        const data = await response.json();
        setPuntuacionQuestions(data);
      } catch (error) {
        console.error("Error fetching puntuacion questions", error);
      }
    };

    fetchComplementoQuestions();
    fetchOpcionMultipleQuestions();
    fetchOpcionMultipleOptions();
    fetchPuntuacionQuestions();
  }, []);

  return (
    <div className="evaluation-form">
      <h2 className="evaluation-title">Evaluacion Primer Sprint</h2>

      {/* Criterio: Opción Múltiple */}
      {opcionMultipleQuestions.length > 0 && (
        <div className="criteria-section">
          <h3 className="criteria-title">Criterio: Habilidades</h3>
          {opcionMultipleQuestions.map((question, index) => (
            <div key={index} className="question">
              <p>{question.pregunta_opcion_multiple}</p>
              <div className="options">
                {opcionMultipleOptions[question.id]?.map((opcion, idx) => (
                  <label key={idx}>
                    <input type="radio" name={`opcionMultiple_${index}`} value={opcion} /> {opcion}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Criterio: Puntuación */}
      {puntuacionQuestions.length > 0 && (
        <div className="criteria-section">
          
          {puntuacionQuestions.map((question, index) => (
            <div key={index} className="question">
              <p>{question.pregunta_puntuacion}</p>
              <div className="scale-options">
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <label key={value}>
                    {value} <input type="radio" name={`puntuacion_${index}`} value={value} />
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Criterio: Complemento */}
      {complementoQuestions.length > 0 && (
        <div className="criteria-section">
          
          {complementoQuestions.map((question, index) => (
            <div key={index} className="question">
              <p>{question.pregunta_complemento}</p>
              <input type="text" className="text-input" placeholder="Respuesta..." />
            </div>
          ))}
        </div>
      )}

      {/* Botones de Cancelar y Finalizar */}
      <div className="buttons">
        <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
        <button className="submit-button" onClick={handleFinish}>Finalizar</button>
      </div>
    </div>
  );
};

export default EvaluationForm;
