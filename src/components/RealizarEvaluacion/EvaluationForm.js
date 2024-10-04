import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importar el hook useNavigate
import './EvaluationForm.css';  // Archivo de estilos

const EvaluationForm = () => {
  const navigate = useNavigate();  // Instanciar el hook

  const handleCancel = () => {
    navigate(-1);  // Esta función regresa a la página anterior
  };

  //EEEEEEEEEEE
  const handleFinish = () => {
    // Guardar en localStorage que la evaluación ha sido entregada
    localStorage.setItem('isDelivered', 'true');

    // Redirigir a la página de evaluación (/evaluacion)
    navigate('/evaluacion');
  };
//eeeeeeee
  return (
    <div className="evaluation-form">
      <h2 className="evaluation-title">Título de la Evaluación</h2>

      {/* Sección de Criterio */}
      <div className="criteria-section">
        <h3 className="criteria-title">Criterio: Habilidades</h3>
        {/* Pregunta 1: Opción múltiple */}
        <div className="question">
          <p>1.- Pregunta 1</p>
          <p>Seleccione una o más opciones:</p>
          <div className="options">
            <label><input type="radio" name="question1" value="option1" /> Opción 1</label>
            <label><input type="radio" name="question1" value="option2" /> Opción 2</label>
            <label><input type="radio" name="question1" value="option3" /> Opción 3</label>
            <label><input type="radio" name="question1" value="option4" /> Opción 4</label>
          </div>
        </div>

        {/* Pregunta 2: Escala de satisfacción */}
        <div className="question">
          <p>2.- Pregunta 2</p>
          <div className="scale-options">
            <label>nada <input type="radio" name="question2" value="1" /></label>
            <label>1 <input type="radio" name="question2" value="2" /></label>
            <label>2 <input type="radio" name="question2" value="3" /></label>
            <label>3 <input type="radio" name="question2" value="4" /></label>
            <label>4 <input type="radio" name="question2" value="5" /></label>
            <label>muchísimo <input type="radio" name="question2" value="6" /></label>
          </div>
        </div>

        {/* Pregunta 3 y 4: Respuesta de texto */}
        <div className="question">
          <p>3.- Pregunta 3</p>
          <input type="text" className="text-input" placeholder="Respuesta..." />
        </div>
        <div className="question">
          <p>4.- Pregunta 4</p>
          <input type="text" className="text-input" placeholder="Respuesta..." />
        </div>
      </div>

      {/* Botones de Cancelar y Finalizar */}
      <div className="buttons">
        <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
        <button className="submit-button"onClick={handleFinish}>Finalizar</button>
      </div>
    </div>
  );
};

export default EvaluationForm;
