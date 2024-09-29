import React, { useState } from 'react';

const PreguntaEvaluationForm = ({ initialName = '', initialQuestions = [], onSubmit }) => {
  const [evaluationName, setEvaluationName] = useState(initialName);
  const [questions, setQuestions] = useState(initialQuestions);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), text: '', type: 'text', options: [''], selected: '' },
    ]);
  };

  const editQuestion = (id, updatedField, value) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id ? { ...q, [updatedField]: value } : q
    );
    setQuestions(updatedQuestions);
  };

  const addOption = (id) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, options: [...q.options, ''] } : q
      )
    );
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!evaluationName || questions.length === 0) {
      alert('Por favor, completa todos los campos y agrega al menos una pregunta.');
      return;
    }
    onSubmit({ name: evaluationName, questions });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre de la Evaluación:</label>
        <input
          type="text"
          value={evaluationName}
          onChange={(e) => setEvaluationName(e.target.value)}
        />
      </div>
      <div>
        <button type="button" onClick={addQuestion}>
          Agregar Pregunta
        </button>
      </div>
      {/* Renderiza las preguntas aquí */}
      <button type="submit">Guardar Evaluación</button>
    </form>
  );
};

export default PreguntaEvaluationForm;