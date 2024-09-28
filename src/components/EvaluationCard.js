import React from 'react';
import { useNavigate } from 'react-router-dom';

const EvaluationCard = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/evaluacion/formulario'); // Redirige a la ruta anidada
  };

  return (
    <div className="evaluation-card">
      <h2>Titulo de la Evaluacion</h2>
      <p>Descripcion de la evaluacion...</p>
      <div className="evaluation-status">No entregado</div>
      <button className="start-button" onClick={handleStartClick}>
        Iniciar
      </button>
    </div>
  );
};

export default EvaluationCard;
