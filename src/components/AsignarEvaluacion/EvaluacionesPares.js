import React, { useState } from 'react';
import './EvaluacionesPares.css';  // Importamos los estilos CSS

const EvaluacionesPares = () => {
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
      fechaInicio: '20/12/29',
      fechaFin: '12/34/65',
    },
    {
      name: 'Evaluación 2',
      description: 'Menu description.',
      criterios: [],
      fechaInicio: '',
      fechaFin: '',
    },
    {
      name: 'Evaluación 3',
      description: 'Menu description.',
      criterios: [],
      fechaInicio: '',
      fechaFin: '',
    },
  ];

  return (
    <div className="evaluaciones-pares">
      <h2>Evaluaciones por pares (Grupal)</h2>
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

export default EvaluacionesPares;
