import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EvaluationForm.css';

const EvaluationForm = () => {
  const navigate = useNavigate();

  const [opcionMultiple, setOpcionMultiple] = useState([]);
  const [puntuacion, setPuntuacion] = useState([]);
  const [complemento, setComplemento] = useState([]);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    // Cargar preguntas cuando el componente se monta
    cargarPreguntas();
  }, []);

  const cargarPreguntas = async () => {
    await preguntaOpcionMultiple();
    await preguntaPuntuacion();
    await preguntaComplemento();
  };

  const preguntaOpcionMultiple = async () => {
    // Simular la obtención de datos
    const datos = [
      { id: 1, titulo: "Actividades" },
      { id: 2, titulo: "Habilidades" },
      { id: 3, titulo: "Animales" },
    ];
    setOpcionMultiple(datos);
  };

  const preguntaPuntuacion = async () => {
    // Simular la obtención de datos
    const datos = [
      { id: 1, titulo: "Satisfacción" },
      { id: 2, titulo: "Utilidad" },
    ];
    setPuntuacion(datos);
  };

  const preguntaComplemento = async () => {
    // Simular la obtención de datos
    const datos = [
      { id: 1, titulo: "Comentarios adicionales" },
    ];
    setComplemento(datos);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleFinish = () => {
    console.log('Responses:', responses);
    navigate('/evaluacion'); // Aquí puedes conectar con la API más adelante
  };

  const handleResponseChange = (id, value) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [id]: value
    }));
  };

  return (
    <div className="evaluation-form">
      <h2 className="evaluation-title">Evaluación Primer Sprint</h2>

      {/* Preguntas de Opción Múltiple */}
      {opcionMultiple.map(pregunta => (
        <div className="criteria-section" key={pregunta.id}>
          <h3 className="criteria-title">{pregunta.titulo}</h3>
          <div className="question">
            <p>Seleccione una opción:</p>
            <div className="vertical-options">
              {["Opción 1", "Opción 2", "Opción 3", "Opción 4"].map((opcion, idx) => (
                <label key={idx} style={{ display: 'block' }}>
                  <input
                    type="radio"
                    name={`opcion_${pregunta.id}`}
                    value={opcion}
                    onChange={() => handleResponseChange(pregunta.id, opcion)}
                  /> {opcion}
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Preguntas de Puntuación */}
      {puntuacion.map(pregunta => (
        <div className="criteria-section" key={pregunta.id}>
          <h3 className="criteria-title">{pregunta.titulo}</h3>
          <div className="question">
            <p>Califique del 1 al 5:</p>
            <div className="scale-options">
              {[1, 2, 3, 4, 5].map(value => (
                <label key={value}>
                  {value} <input
                    type="radio"
                    name={`puntuacion_${pregunta.id}`}
                    value={value}
                    onChange={() => handleResponseChange(pregunta.id, value)}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Preguntas de Complemento */}
      {complemento.map(pregunta => (
        <div className="criteria-section" key={pregunta.id}>
          <h3 className="criteria-title">{pregunta.titulo}</h3>
          <div className="question">
            <input
              type="text"
              className="text-input"
              placeholder="Respuesta..."
              onChange={(e) => handleResponseChange(pregunta.id, e.target.value)}
            />
          </div>
        </div>
      ))}

      <div className="buttons">
        <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
        <button className="submit-button" onClick={handleFinish}>Finalizar</button>
      </div>
    </div>
  );
};

export default EvaluationForm;