import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

import { API_BASE_URL } from '../config';  // Importamos la URL de la API
import './Asignar.css';  // Importamos los estilos CSS

const Asignar = () => {
  const { tipo } = useParams();
  const { destinatario } = useParams();

  const destinatarioVar = destinatario === 'grupal' ? 'Grupal' : 'Individual';
  const tipoVar = tipo === '1' ? 'Autoevaluación' : tipo === '2' ? 'Evaluación Cruzada' : 'Evaluación de Pares';
  const tipoDestinatarioOp = destinatario === 'grupal' ? true : false;
  
  const [ expandedGroup, setExpandedGroup ] = useState(null);  // Estado para manejar qué grupo está expandido
  const [ grupos, setGrupos ] = useState([]);  // Estado para manejar los grupos
  const [ evaluaciones, setEvaluaciones ] = useState([]); // Estado para manejar las evaluaciones
  const [evaluacionSeleccionada, setEvaluacionSeleccionada] = useState('');
  const navigate = useNavigate();
  
  const obtenerEvaluaciones = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/evaluaciones`); // Reemplaza con la URL de tu API
      const evaluacionesFiltradas = response.data.filter(evaluacion => evaluacion.tipo_evaluacion === parseInt(tipo) && 
                                                          evaluacion.tipo_destinatario === tipoDestinatarioOp);
      
      if(evaluacionesFiltradas.length === 0) {
        setEvaluaciones([]);
      }else{setEvaluaciones(evaluacionesFiltradas);}

    } catch (error) {
      console.error('Error al obtener los datos de la API', error);
    }
  };

  const toggleGroup = (groupIndex) => {
    if (expandedGroup === groupIndex) {
      setExpandedGroup(null);  // Colapsa el grupo si ya está expandido
    } else {
      setExpandedGroup(groupIndex);  // Expande el grupo seleccionado
    }
  };

  // Datos simulados de los grupos
  const gruposEjemplo = [
    {
      name: 'Grupo 1',
      description: 'Menu description.',
      members: [
        { name: 'Alan Meneces F.', leader: false },
        { name: 'Ever Blanco V.', leader: false },
        { name: 'Paola Soto', leader: false },
        { name: 'Boris Anthony U.', leader: true },
        { name: 'Jhoanson', leader: false }
      ]
    },
    {
      name: 'Grupo 2',
      description: 'Menu description.',
      members: []
    },
    {
      name: 'Grupo 3',
      description: 'Menu description.',
      members: []
    }
  ];

  useEffect(() => {
    setGrupos(gruposEjemplo);
    obtenerEvaluaciones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEvaluacionChange = (event) => {//para la lista deslizable de evaluaciones
    setEvaluacionSeleccionada(event.target.value);
    console.log(event.target.value);
  };

  const handleBack = () => {
    navigate(-1); // Navegar a la página anterior
  };

  return (
    <div className="evaluation-grupos">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{tipoVar} ({destinatarioVar})</h2>
        <Button onClick={handleBack} style={{ marginLeft: '10px', backgroundColor:'#09DDCC', color:'black', border:'none'}}>
          <FaArrowLeft />
        </Button>
      </div>
      <h4>Seleccione Evaluación que desea asignar:</h4>
      <select value={evaluacionSeleccionada} onChange={handleEvaluacionChange} className="selector-evaluaciones">
        <option value="">Seleccione una evaluación</option>
        {evaluaciones.map((evaluacion) => (
          <option key={evaluacion.id} value={evaluacion.id}>
            {evaluacion.nombre_evaluacion}
          </option>
        ))}
      </select>

      {grupos.map((group, index) => (
        <div key={index} className="group">
          <div className="group-header" onClick={() => toggleGroup(index)}>
            <span>{group.name}</span>
            <span>{expandedGroup === index ? '▲' : '▼'}</span>
          </div>
          {expandedGroup === index && (
            <div className="group-details">
              <p>{group.description}</p>
              {group.members.length > 0 ? (
                <div className="members">
                  <h4>Integrantes</h4>
                  <ul>
                    {group.members.map((member, idx) => (
                      <li key={idx}>
                        {member.name} {member.leader && <span>- Líder</span>}
                      </li>
                    ))}
                  </ul>
                  <button className="view-group-btn">Ver Grupo</button>
                </div>
              ) : (
                <p>No hay miembros asignados.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Asignar;
