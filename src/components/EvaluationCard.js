import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EvaluationCard = () => {
  const [evaluation, setEvaluation] = useState(null); // Estado para almacenar los datos de la evaluación
  const [loading, setLoading] = useState(true); // Estado para indicar que los datos están cargando
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate();

  // Este hook se ejecuta cuando el componente se monta para obtener datos de la API
  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/evaluaciones/1'); // Cambia el ID o usa un endpoint dinámico si es necesario
        if (!response.ok) {
          throw new Error('Error al obtener los datos de la evaluación');
        }
        const data = await response.json();
        setEvaluation(data.evaluacion); // Almacena los datos obtenidos en el estado
      } catch (error) {
        setError(error.message); // Manejo de errores
      } finally {
        setLoading(false); // Indica que los datos han terminado de cargar
      }
    };

    fetchEvaluation(); // Llamada a la función de obtención de datos
  }, []);

  const handleStartClick = () => {
    navigate('/evaluacion/formulario'); // Redirige al formulario de la evaluación
  };

  if (loading) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  if (error) {
    return <div>Error: {error}</div>; // Muestra un mensaje de error si ocurre un problema
  }

  return (
    <div className="evaluation-card">
      <h2>{evaluation?.nombre_evaluacion || 'Título no disponible'}</h2> {/* Muestra el nombre de la evaluación */}
      <p>{evaluation?.tipo_evaluacion || 'Tipo no disponible'}</p> {/* Muestra el tipo de la evaluación */}
      <div className="evaluation-status">
        {evaluation?.tipo_destinatario ? 'Entregado' : 'No entregado'} {/* Muestra el estado de entrega */}
      </div>
      <button className="start-button" onClick={handleStartClick}>
        Iniciar
      </button>
    </div>
  );
};

export default EvaluationCard;
