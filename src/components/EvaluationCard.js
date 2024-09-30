import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from './config';

import './EvaluationCard.css';

const EvaluationCard = () => {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvaluaciones = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/asignaciones`);
        const filtered = response.data.filter(asignacion => asignacion.id_usuario === 1);
        
        const evaluaciones = await axios.get(`${API_BASE_URL}/evaluaciones`);
  
        const evaluacionesFiltradas = [];
        for (const filtro of filtered) {
          const filtradas = evaluaciones.data.filter(eva => eva.id === filtro.id_evaluacion);
          evaluacionesFiltradas.push(...filtradas);
        }
        
        const datosImprimir = [];
        for(let i=0; i<evaluacionesFiltradas.length; i++){
          const nombre = evaluacionesFiltradas[i].nombre_evaluacion;
          const estado = filtered[i].estado_evaluacion ? "Entregado" : "No entregado";
          let tipoTexto;
          const tipo = evaluacionesFiltradas[i].tipo_evaluacion;
          if(tipo === 1){
            tipoTexto = "Autoevaluacion";
          }else if(tipo === 2){
            tipoTexto = "Evaluacion en pares";
          }else if(tipo === 3){
            tipoTexto = "Evaluacion cruzada";
          }
          datosImprimir.push({nombre, estado, tipo: tipoTexto});
        }
        
        console.log('Evaluaciones:', datosImprimir);
        setEvaluaciones(datosImprimir);
      } catch (error) {
        console.error('Error al obtener las evaluaciones:', error);
      }
    };

    fetchEvaluaciones();
  }, []);

  const handleStartClick = () => {
    navigate('/evaluacion/formulario'); // Redirige a la ruta anidada
  };

  return (
    <div className="evaluation-card">
      
      {evaluaciones.map((evaluacion) => (
        <div key={evaluacion.id} className="evaluation-card">
          <h2>{evaluacion.nombre}</h2>
          <p>{evaluacion.tipo}</p>
          <div className="evaluation-status">{evaluacion.estado}</div>
          <button className="start-button" onClick={() => handleStartClick(evaluacion.id)}>
            Iniciar
          </button>
        </div>
        
      ))}
    </div>
    
  );
};

export default EvaluationCard;
