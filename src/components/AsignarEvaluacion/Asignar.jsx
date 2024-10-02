import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { API_BASE_URL } from '../config';  // Importamos la URL de la API
import './Asignar.css';  // Importamos los estilos CSS

const Asignar = () => {
  const { tipo } = useParams();
  const { destinatario } = useParams();

  const destinatarioVar = destinatario === 'grupal' ? 'Grupal' : 'Individual';
  const tipoVar = tipo === '1' ? 'Autoevaluación' : tipo === '2' ? 'Evaluación Cruzada' : 'Evaluación de Pares';
  
  const [ expandedGroup, setExpandedGroup ] = useState(null);  // Estado para manejar qué grupo está expandido
  const [ grupos, setGrupos ] = useState([]);  // Estado para manejar los grupos
  const [ evaluaciones, setCriterios ] = useState([]); // Estado para manejar las evaluaciones

  const obtenerEvaluaciones = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/evaluaciones`); // Reemplaza con la URL de tu API
      const evaluacionesFiltradas = response.data.filter(evaluacion => evaluacion.id_tipo_evaluacion === parseInt(tipo));
      setCriterios(evaluacionesFiltradas.data);
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

  return (
    <div className="evaluation-grupos">
      <h2>{tipoVar} ({destinatarioVar})</h2>
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
