import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importamos el hook useNavigate

import './EvaluationType.css';  // Importamos los estilos

const EvaluationType = () => {
  const [activeType, setActiveType] = useState('Individual');  // Estado para manejar el tipo de evaluación activo
  const navigate = useNavigate();  // Definimos el hook para navegación

  // Definimos las evaluaciones que estarán disponibles para cada tipo
  const evaluations = {
    Individual: [
      { title: 'Evaluacion por pares', description: 'Description duis aute irure dolor in reprehenderit in voluptate velit.' },
      { title: 'Autoevaluacion', description: 'Description duis aute irure dolor in reprehenderit in voluptate velit.' }
    ],
    Grupal: [
      { title: 'Evaluacion por pares', description: 'Description duis aute irure dolor in reprehenderit in voluptate velit.' },
      { title: 'Autoevaluacion', description: 'Description duis aute irure dolor in reprehenderit in voluptate velit.' },
      { title: 'Evaluacion Cruzada', description: 'Description duis aute irure dolor in reprehenderit in voluptate velit.' }
    ]
  };

  const handleEvaluationClick = (evaluation) => {
    if (evaluation.route) {
      navigate(evaluation.route);  // Navegamos a la ruta si está definida
    }
  };

  return (
    <div className="evaluation-type">
      <div className="evaluation-header">
        {/* Botón para agregar evaluación */}
        <button className="add-evaluation-btn">
          <span className="add-evaluation-icon">+</span> AGREGAR EVALUACIÓN
        </button>
      </div>

      {/* Botones para elegir el tipo de evaluación */}
      <div className="evaluation-toggle">
        <button
          className={`evaluation-toggle-btn ${activeType === 'Individual' ? 'active' : ''}`}
          onClick={() => setActiveType('Individual')}
        >
          Individual
        </button>
        <button
          className={`evaluation-toggle-btn ${activeType === 'Grupal' ? 'active' : ''}`}
          onClick={() => setActiveType('Grupal')}
        >
          Grupal
        </button>
      </div>

      <h3>Lista de evaluaciones</h3>

      {/* Listado de evaluaciones dinámico según el tipo seleccionado */}
      <div className="evaluation-list">
        {evaluations[activeType].map((evaluation, index) => (
          <div key={index} className="evaluation-item" onClick={() => handleEvaluationClick(evaluation.title)}>
            <div>
              <h4>{evaluation.title}</h4>
              <p>{evaluation.description}</p>
            </div>
            <div className="arrow">▶</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvaluationType;
