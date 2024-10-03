import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Importamos el hook useNavigate

import './EvaluationType.css';  // Importamos los estilos

const EvaluationType = () => {
  const [activeType, setActiveType] = useState('Individual');  // Estado para manejar el tipo de evaluación activo
  const navigate = useNavigate();  // Definimos el hook para navegación

  // Definimos las evaluaciones que estarán disponibles para cada tipo
  const evaluations = {
    Individual: [
      { title: 'Autoevaluacion', description: 'Evaluación que permite a los equipos de trabajo y a sus integrantes realizar una retroalimentación sobre su trabajo.' 
        , destinatario: 'individual', tipo: 1
      },
      { title: 'Evaluacion por pares', description: 'Permite a los integrantes de un equipo evaluar el desempeño de sus compañeros de equipo.' 
        , destinatario: 'individual', tipo: 3
      },
    ],
    Grupal: [
      { title: 'Autoevaluacion', description: 'Evaluación que permite a los equipos de trabajo y a sus integrantes realizar una retroalimentación sobre su trabajo.' 
        , destinatario: 'grupal', tipo: 1
      },
      { title: 'Evaluacion Cruzada', description: 'Evaluación que permite a los equipos de trabajo evaluar el trabajo de otros equipos.' 
        , destinatario: 'grupal', tipo: 2
      }
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
        <h2 >Asignar Evaluación</h2>
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

      <h3 style={{marginBottom:'2%'}}>Lista de evaluaciones</h3>
      {/* Listado de evaluaciones dinámico según el tipo seleccionado */}
      <div className="evaluation-list">
      {evaluations[activeType].map((evaluation, index) => (
          <Link to={`/asignarEvaluacion/${evaluation.destinatario}/${evaluation.tipo}`} key={index} className="evaluation-item-link">
            <div className="evaluation-item" onClick={() => handleEvaluationClick(evaluation.title)}>
              <div>
                <h5>{evaluation.title}</h5>
                <p>{evaluation.description}</p>
              </div>
              <div className="arrow">▶</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EvaluationType;
