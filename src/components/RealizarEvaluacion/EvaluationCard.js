import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import './EvaluationCard.css';

const EvaluationCard = () => {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvaluacion, setSelectedEvaluacion] = useState(null);
  const [criterios, setCriterios] = useState([]);
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
          // Obtener las asignaciones del usuario
          const asignacionesResponse = await axios.get(`${API_BASE_URL}/asignaciones`);
          const filtered = asignacionesResponse.data.filter(asignacion => asignacion.id_usuario === userId);

          // Obtener todas las evaluaciones
          const evaluacionesResponse = await axios.get(`${API_BASE_URL}/evaluaciones`);
          
          // Filtrar las evaluaciones según las asignaciones
          const evaluacionesFiltradas = evaluacionesResponse.data.filter(evaluacion =>
            filtered.some(filtro => evaluacion.id === filtro.id_evaluacion)
          );

          // Mapear las evaluaciones y usar el estado de las asignaciones
          const datosImprimir = evaluacionesFiltradas.map(evaluacion => {
            const asignacion = filtered.find(filtro => filtro.id_evaluacion === evaluacion.id);
            let estadoTexto = asignacion ? (asignacion.estado_evaluacion === 1 ? "Entregado" : "No entregado") : "No asignado";
            
            let tipoTexto;
            let modalidadTexto;
          
            switch (evaluacion.tipo_evaluacion) {
              case 1:
                tipoTexto = "Autoevaluación";
                modalidadTexto = "individual";
                break;
              case 2:
                tipoTexto = "Evaluación cruzada";
                modalidadTexto = "grupal";
                break;
              case 3:
                tipoTexto = "Evaluación por pares";
                modalidadTexto = "individual";
                break;
              default:
                tipoTexto = "Tipo desconocido";
                modalidadTexto = "DESCONOCIDA";
            }
          
            return {
              id: evaluacion.id,
              nombre: evaluacion.nombre_evaluacion,
              estado: estadoTexto,
              tipo: tipoTexto,
              modalidad: modalidadTexto,
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

  const handleStartClick = async (id) => {    
    setSelectedEvaluacion(id);
    setModalIsOpen(true);

    // Obtener criterios para la evaluación seleccionada
    try {
      const response = await axios.get(`${API_BASE_URL}/evaluaciones/${id}/criterios`);
      setCriterios(response.data);
    } catch (error) {
      console.error('Error al obtener los criterios:', error);
      setCriterios([]); // Manejar el error estableciendo criterios vacíos
    }
  };

  const handleConfirmStart = () => {
    console.log("Empezando: ", selectedEvaluacion);
    
    navigate('/evaluacion/formulario', {
      state: { id: selectedEvaluacion },
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
            <p>Modalidad: {evaluacion.modalidad}</p>
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
            <ul>
              {criterios.length > 0 ? (
                criterios.map(criterio => (
                  <li key={criterio.id}>{criterio.titulo_criterio}</li>
                ))
              ) : (
                <li>No hay criterios disponibles para esta evaluación.</li>
              )}
            </ul>
            <button onClick={handleConfirmStart}>Sí, iniciar</button>
            <button onClick={handleCancelStart}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationCard;