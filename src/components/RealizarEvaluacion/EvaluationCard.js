import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import './EvaluationCard.css';

const EvaluationCard = () => {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvaluacion, setSelectedEvaluacion] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvaluaciones = async () => {
      const storedUser = localStorage.getItem('user');
      let userId = null;

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          userId = parsedUser.userData.id;
        } catch (error) {
          console.error('Error al parsear los datos del usuario:', error);
        }
      }

      if (userId) {
        try {
          const asignacionesResponse = await axios.get(`${API_BASE_URL}/asignaciones`);
          const filtered = asignacionesResponse.data.filter(asignacion => asignacion.id_usuario === userId);

          const evaluacionesResponse = await axios.get(`${API_BASE_URL}/evaluaciones`);
          const evaluacionesFiltradas = evaluacionesResponse.data.filter(evaluacion =>
            filtered.some(filtro => evaluacion.id === filtro.id_evaluacion)
          );

          const datosImprimir = evaluacionesFiltradas.map(evaluacion => {
            const estado = filtered.find(filtro => filtro.id_evaluacion === evaluacion.id)?.estado_evaluacion ? "Entregado" : "No entregado";
            let tipoTexto;

            switch (evaluacion.tipo_evaluacion) {
              case 1:
                tipoTexto = "Autoevaluacion";
                break;
              case 2:
                tipoTexto = "Evaluacion en pares";
                break;
              case 3:
                tipoTexto = "Evaluacion cruzada";
                break;
              default:
                tipoTexto = "Tipo desconocido";
            }

            return {
              id: evaluacion.id,
              nombre: evaluacion.nombre_evaluacion,
              estado,
              tipo: tipoTexto,
            };
          });

          setEvaluaciones(datosImprimir);
        } catch (error) {
          console.error('Error al obtener las evaluaciones:', error);
        }
      } else {
        console.warn('No se encontró el ID del usuario.');
      }
    };

    fetchEvaluaciones();

    const handleStorageChange = () => {
      const storedEvaluaciones = localStorage.getItem('evaluaciones');
      if (storedEvaluaciones) {
        setEvaluaciones(JSON.parse(storedEvaluaciones));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleFinishEvaluation = (evaluacionId) => {
    setEvaluaciones(prevEvaluaciones => {
      const updatedEvaluaciones = prevEvaluaciones.map(e => 
        e.id === evaluacionId ? { ...e, estado: "Entregado" } : e
      );
      localStorage.setItem('evaluaciones', JSON.stringify(updatedEvaluaciones));
      return updatedEvaluaciones;
    });
  };

  const handleStartClick = (evaluacionId) => {
    setSelectedEvaluacion(evaluacionId);
    setModalIsOpen(true);
  };

  const handleConfirmStart = () => {
    navigate('/evaluacion/formulario', {
      state: { evaluacionId: selectedEvaluacion }, // No pasar onFinish aquí
    });
    setModalIsOpen(false);
  };

  const handleCancelStart = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="evaluation-card">
      {evaluaciones.length === 0 ? (
        <p>No hay evaluaciones disponibles.</p>
      ) : (
        evaluaciones.map((evaluacion) => (
          <div key={evaluacion.id} className="evaluation-card">
            <h2>{evaluacion.nombre}</h2>
            <p>{evaluacion.tipo}</p>
            <div className="evaluation-status">{evaluacion.estado}</div>
            <button className="start-button" onClick={() => handleStartClick(evaluacion.id)}>
              Iniciar
            </button>
          </div>
        ))
      )}
      {modalIsOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmación</h2>
            <p>¿Estás seguro de que deseas iniciar esta evaluación?</p>
            <button onClick={handleConfirmStart}>Sí, iniciar</button>
            <button onClick={handleCancelStart}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationCard;