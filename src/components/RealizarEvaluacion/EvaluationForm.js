import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const EvaluationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { evaluacionId, updateEvaluacionEstado } = location.state || {};
  const [responses, setResponses] = useState({});

  useEffect(() => {
    // Aquí puedes cargar las preguntas o cualquier otra lógica necesaria
  }, []);

  const handleResponseChange = (id, value) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [id]: value
    }));
  };

  const handleFinish = () => {
    // Lógica para manejar la finalización de la evaluación
    if (typeof updateEvaluacionEstado === 'function') {
      updateEvaluacionEstado(evaluacionId); // Llama a la función para actualizar el estado
    } else {
      console.error('updateEvaluacionEstado no es una función');
    }
    
    navigate('/evaluacion'); // Redirigir después de finalizar
  };

  return (
    <div className="evaluation-form">
      <h2>Formulario de Evaluación</h2>
      {/* Aquí agregarías tus preguntas y lógica para el formulario */}
      
      <button className="finish-button" onClick={handleFinish}>
        Finalizar
      </button>
    </div>
  );
};

export default EvaluationForm;
