import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
/*import FormRange from 'react-bootstrap/FormRange'*/
import '../../../assets/css/Autoevaluacion.css';

const AutoEvaluationForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state: editandoAutoevaluacion } = location;

    const [autoevaluacionName, setAutoevaluacionName] = useState(editandoAutoevaluacion ? editandoAutoevaluacion.name : '');
    const [questions, setQuestions] = useState([]);

    // Tipos de preguntas
    const questionTypes = [
        { value: 'text', label: 'Respuesta Corta' },
        { value: 'textarea', label: 'Texto Largo' },
        { value: 'rating', label: 'Escala de Autoevaluación (1-5)' },
        { value: 'multiple', label: 'Selección Múltiple' },
    ];

    // Función para agregar una nueva pregunta
    const addQuestion = () => {
        setQuestions([
            ...questions,
            { id: Date.now(), text: '', type: 'text', options: [''], selected: '' },
        ]);
    };

    // Función para editar una pregunta
    const editQuestion = (id, updatedField, value) => {
        const updatedQuestions = questions.map((q) =>
            q.id === id ? { ...q, [updatedField]: value } : q
        );
        setQuestions(updatedQuestions);
    };

    // Función para agregar una opción a una pregunta de selección múltiple
    const addOption = (id) => {
        setQuestions(
            questions.map((q) =>
                q.id === id
                    ? { ...q, options: [...q.options, ''] }
                    : q
            )
        );
    };

    // Función para eliminar una pregunta
    const deleteQuestion = (id) => {
        setQuestions(questions.filter((q) => q.id !== id));
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!autoevaluacionName || questions.length === 0) {
            alert('Por favor, completa todos los campos y agrega al menos una pregunta.');
            return;
        }
        console.log({ autoevaluacionName, questions });
        alert('Formulario enviado exitosamente');
    };

    return (
        <div className="container">
            <h1>Formulario de Autoevaluación</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="autoevaluacionName">Nombre de la Evaluación:</label>
                    <input
                        id="autoevaluacionName"
                        type="text"
                        value={autoevaluacionName}
                        onChange={(e) => setAutoevaluacionName(e.target.value)}
                        required
                    />
                </div>

                <h3>Preguntas</h3>
                {questions.length === 0 ? (
                    <p>No hay preguntas añadidas.</p>
                ) : (
                    questions.map((q, index) => (
                        <div key={q.id} className="question-item">
                            <label>Pregunta {index + 1}:</label>
                            <input
                                type="text"
                                value={q.text}
                                onChange={(e) => editQuestion(q.id, 'text', e.target.value)}
                                placeholder="Escribe la pregunta"
                                required
                            />

                            <label>Tipo de pregunta:</label>
                            <select
                                value={q.type}
                                onChange={(e) => editQuestion(q.id, 'type', e.target.value)}
                            >
                                {questionTypes.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>

                            {/* Si la pregunta es de tipo selección múltiple */}
                            {q.type === 'multiple' && (
                                <div className="multiple-options">
                                    <label>Opciones:</label>
                                    {q.options.map((option, i) => (
                                        <input
                                            key={i}
                                            type="text"
                                            value={option}
                                            placeholder={`Opción ${i + 1}`}
                                            onChange={(e) => {
                                                const newOptions = [...q.options];
                                                newOptions[i] = e.target.value;
                                                editQuestion(q.id, 'options', newOptions);
                                            }}
                                        />
                                    ))}
                                    <button type="button" onClick={() => addOption(q.id)}>
                                        Agregar opción
                                    </button>
                                </div>
                            )}

                            {q.type === 'rating' && (
                                <div>
                                    <label>Escala de 1 a 5</label>
                                </div>
                            )}

                            <button type="button" onClick={() => deleteQuestion(q.id)}>
                                Eliminar Pregunta
                            </button>
                        </div>
                    ))
                )}

                <button type="button" onClick={addQuestion} className="add-question-btn">
                    Agregar Pregunta
                </button>

                <button type="submit" className="submit-btn">
                    Enviar Evaluación
                </button>
            </form>
        </div>
    );
};

export default AutoEvaluationForm;