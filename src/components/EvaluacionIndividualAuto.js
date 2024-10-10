import React, { useState } from 'react';
import './EvaluacionesPares.css';  // Importamos los estilos CSS

const EvaluacionIndividualAuto = () => {
  const [expandedEvaluation, setExpandedEvaluation] = useState(null);  // Estado para manejar qué evaluación está expandida

  const toggleEvaluation = (evaluationIndex) => {
    if (expandedEvaluation === evaluationIndex) {
      setExpandedEvaluation(null);  // Colapsa la evaluación si ya está expandida
    } else {
      setExpandedEvaluation(evaluationIndex);  // Expande la evaluación seleccionada
    }
  };

  // Datos simulados de las evaluaciones
  const evaluaciones = [
    {
      name: 'Evaluación 1',
      description: 'Menu description.',
      criterios: [
        { name: 'Puntualidad', preguntas: 10 },
        { name: 'Responsabilidad', preguntas: 12 },
        { name: 'Compromiso', preguntas: 9 },
        { name: 'Habilidad', preguntas: 8 },
      ],
      fechaInicio: '20/09/24',
      fechaFin: '28/09/24',
    },
    {
      name: 'Evaluación 2',
      description: 'Menu description.',
      criterios: [
        { name: 'Puntualidad', preguntas: 10 },
        { name: 'Responsabilidad', preguntas: 12 },
        { name: 'Compromiso', preguntas: 9 },
        { name: 'Habilidad', preguntas: 8 },
      ],
      fechaInicio: '20/09/24',
      fechaFin: '28/09/24',
    },
    {
      name: 'Evaluación 3',
      description: 'Menu description.',
      criterios: [
        { name: 'Puntualidad', preguntas: 10 },
        { name: 'Responsabilidad', preguntas: 12 },
        { name: 'Compromiso', preguntas: 9 },
        { name: 'Habilidad', preguntas: 8 },
      ],
      fechaInicio: '20/09/24',
      fechaFin: '28/09/24',
    },
  ];

  return (
    <div className="evaluaciones-pares">
      <div className="button-container">
        <button className="add-evaluation-btn">
          <span className="add-evaluation-icon">+</span> AGREGAR EVALUACIÓN
        </button>
      </div>

      <h2>Autoevaluacion (Individual)</h2>
      {evaluaciones.map((evaluacion, index) => (
        <div key={index} className="evaluation">
          <div className="evaluation-header" onClick={() => toggleEvaluation(index)}>
            <span>{evaluacion.name}</span>
            <span>{expandedEvaluation === index ? '▲' : '▼'}</span>
          </div>
          {expandedEvaluation === index && (
            <div className="evaluation-details">
              <p>{evaluacion.description}</p>
              {evaluacion.criterios.length > 0 ? (
                <div className="criterios">
                  <table>
                    <thead>
                      <tr>
                        <th>Criterio</th>
                        <th>Cantidad de preguntas</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {evaluacion.criterios.map((criterio, idx) => (
                        <tr key={idx}>
                          <td>{criterio.name}</td>
                          <td>{criterio.preguntas}</td>
                          <td>{evaluacion.fechaInicio}</td>
                          <td>{evaluacion.fechaFin}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No hay criterios asignados.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EvaluacionIndividualAuto;
