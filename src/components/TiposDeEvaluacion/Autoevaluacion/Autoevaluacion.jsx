import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Modal from '../Modal';
import EvaluationForm from '../PreguntaEvaluation';
import '../../../assets/css/Autoevaluacion.css';

const AutoEvaluationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state: editandoAutoevaluacion } = location;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoevaluacionName, setAutoevaluacionName] = useState(editandoAutoevaluacion ? editandoAutoevaluacion.name : '');
  const [questions, setQuestions] = useState([]);
  const [questionTypes, setQuestionTypes] = useState([]);

  // Función para obtener los datos de la API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000'); // Reemplaza 'URL_DE_TU_API' con la URL de tu API
      const data = response.data;
      setAutoevaluacionName(data.name);
      setQuestions(data.questions);
      setQuestionTypes(data.questionTypes);
    } catch (error) {
      console.error('Error al obtener los datos de la API', error);
    }
  };

  // useEffect para obtener los datos de la API al cargar el componente
  useEffect(() => {
    fetchData();
  }, []);

  const handleFormSubmit = (data) => {
    console.log('Datos del formulario:', data);
    setIsModalOpen(false);
  };

  const handleAddAutoevaluacion = () => {
    setAutoevaluacionName('');
    setQuestions([]);
    setIsModalOpen(true);
  };

  return (
    <div>
        <h1>{autoevaluacionName}</h1>
        <button onClick={handleAddAutoevaluacion}>Agregar Autoevaluación</button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <EvaluationForm
            initialName={autoevaluacionName}
            initialQuestions={questions}
            onSubmit={handleFormSubmit}
        />
      </Modal>
    </div>
  );
};

export default AutoEvaluationForm;
