import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BotonAtras from '../General/BotonAtras';
import { FaPlus } from 'react-icons/fa';

import { API_BASE_URL } from '../config';  // Importamos la URL de la API
import './Asignar.css';  // Importamos los estilos CSS

const Asignar = () => {
  const { tipo } = useParams();
  const { destinatario } = useParams();
  const { id_tutor } = 1;

  const destinatarioVar = destinatario === 'grupal' ? 'Grupal' : 'Individual';
  const tipoVar = tipo === '1' ? 'Autoevaluación' : tipo === '2' ? 'Evaluación Cruzada' : 'Evaluación de Pares';
  const tipoDestinatarioOp = destinatario === 'grupal' ? true : false;
  
  const [ expandedGroup, setExpandedGroup ] = useState(null);  // Estado para manejar qué grupo está expandido
  const [ grupos, setGrupos ] = useState([]);  // Estado para manejar los grupos
  const [ evaluaciones, setEvaluaciones ] = useState([]); // Estado para manejar las evaluaciones
  const [evaluacionSeleccionada, setEvaluacionSeleccionada] = useState('');
  const [mensaje, setMensaje] = useState('');
  
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

  const obtnerGrupos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/grupos`); // Reemplaza con la URL de tu API
      const gruposFiltrados = response.data.filter(grupo => grupo.id_tutor === id_tutor);
      setGrupos(response.data);
    } catch (error) {
      console.error('Error al obtener los datos de la API', error);
    }
  }

  const toggleGroup = (groupIndex) => {
    if (expandedGroup === groupIndex) {
      setExpandedGroup(null);  // Colapsa el grupo si ya está expandido
    } else {
      setExpandedGroup(groupIndex);  // Expande el grupo seleccionado
    }
  };

  useEffect(() => {
    obtnerGrupos();
    obtenerEvaluaciones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEvaluacionChange = (event) => {//para la lista deslizable de evaluaciones
    setEvaluacionSeleccionada(event.target.value);
    setMensaje('');
  };

  const handleAddMemberClick = () => {
    if (!evaluacionSeleccionada) {
      setMensaje('Debe seleccionar una evaluación.');
    } else {
      // Lógica para agregar miembro
      console.log('Agregar miembro');
    }
  };

  return (
    <div className="evaluation-grupos">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{tipoVar} ({destinatarioVar})</h2>
        <BotonAtras />
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
      {mensaje && <p className="mensaje-advertencia">{mensaje}</p>}
      {grupos.map((group, index) => (
        <div key={index} className="group">
          
          <div className="group-header" onClick={() => toggleGroup(index)}>
            <span>{group.nombre_grupo}</span>
            <span>{expandedGroup === index ? '▲' : '▼'}</span>
          </div>
          {expandedGroup === index && (
            <div className="group-details">
              <button className="add-member-btn" onClick={handleAddMemberClick}>
                <FaPlus /> {/* Icono de + */}
              </button>
              <p>{group.descripcion_grupo}</p>
              {(group.members && group.members.length > 0) ? (
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
