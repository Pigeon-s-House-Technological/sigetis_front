import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BotonAtras from '../General/BotonAtras';
import { FaPlus } from 'react-icons/fa';

import { API_BASE_URL } from '../config';  // Importamos la URL de la API
import './Asignar.css';  // Importamos los estilos CSS

const Asignar = () => {
  const { tipo } = useParams();
  const { destinatario } = useParams();
  const navigate = useNavigate();

  const destinatarioVar = destinatario === 'grupal' ? 'Grupal' : 'Individual';
  const tipoVar = tipo === '1' ? 'Autoevaluación' : tipo === '2' ? 'Evaluación Cruzada' : 'Evaluación de Pares';
  const tipoDestinatarioOp = destinatario === 'grupal' ? true : false;
  
  const [expandedGroup, setExpandedGroup] = useState(null);  // Estado para manejar qué grupo está expandido
  const [grupos, setGrupos] = useState([]);  // Estado para manejar los grupos
  const [evaluaciones, setEvaluaciones] = useState([]); // Estado para manejar las evaluaciones
  const [evaluacionSeleccionada, setEvaluacionSeleccionada] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [asignaciones, setAsignaciones] = useState([]);
  const [grupoPrincipal, setGrupoPrincipal] = useState(null);
  const [grupoAux, setGrupoAux] = useState(null);
  const [idTutor, setIdTutor] = useState(null);

  useEffect(() => {
    // Obtener el ID del usuario desde el almacenamiento local
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setIdTutor(parsedUser.userData.id);  // Establecer el ID del tutor
      } catch (error) {
        console.error('Error al parsear los datos del usuario:', error); 
      }
    }
  }, []);

  useEffect(() => {
    if (idTutor) {
      obtnerGrupos();
      obtenerAsignaciones();
      obtenerEvaluaciones();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idTutor]);

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
      const response = await axios.get(`${API_BASE_URL}/grupos`);

      const gruposData = response.data.filter((grupo) => grupo.id_tutor === idTutor);

        // Procesar los datos para obtener los integrantes de cada grupo
        const gruposConIntegrantes = await Promise.all(gruposData.map(async (grupo) => {
          const integrantesResponse = await axios.get(`${API_BASE_URL}/gruposUsuarios/integrantes/${grupo.id}`);
          const integrantesData = integrantesResponse.data.integrantes;
          return {
            ...grupo,
            integrantes: integrantesData
          };
        }));

        setGrupos(gruposConIntegrantes);
        console.log('grupos:',gruposConIntegrantes);
        
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }

  const obtenerAsignaciones = async () => {
    try {
      const responseAsignaciones = await axios.get(`${API_BASE_URL}/asignaciones`);
      const asignacionesData = responseAsignaciones.data;
      setAsignaciones(asignacionesData);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const toggleGroup = (groupIndex) => {
    if (expandedGroup === groupIndex) {
      setExpandedGroup(null);  // Colapsa el grupo si ya está expandido
    } else  {
      setExpandedGroup(groupIndex);  // Expande el grupo seleccionado
    }
  };

  const handleEvaluacionChange = (event) => {//para la lista deslizable de evaluaciones
    setEvaluacionSeleccionada(event.target.value);
    setMensaje('');
  };

  const handleAddMemberClick = (group) => {
    if (!evaluacionSeleccionada) {
      setMensaje('Debe seleccionar una evaluación.');
    } else if(parseInt(tipo) === 1 && destinatario === 'individual') {
      individualAutoevaluacion(group);
    }else if(parseInt(tipo) === 1 && destinatario === 'grupal'){
      grupalAutoevaluacion(group);
    }else if(parseInt(tipo) === 2){
      setGrupoPrincipal(group);
      setGrupoAux(null);
    }else if(parseInt(tipo) === 3){
      evaluacionPares(group);
    }else{
      console.log('error al cargar evaluaciones');
    }
  };

  const individualAutoevaluacion = async(group) => {
    let grupoAsignado = false;
    if (!Array.isArray(asignaciones)) {
      console.error('Asignaciones no es un array:', asignaciones);
    }else{
      grupoAsignado = asignaciones.some(asignacion =>
        asignacion.id_evaluacion === parseInt(evaluacionSeleccionada) &&
        group.integrantes.some(integrante => asignacion.id_usuario === integrante.id)
      );
    }

    if (grupoAsignado) {
      alert('Este grupo ya está asignado a esta evaluación.');
      return;
    }
    try {
      const evaluacionId = evaluacionSeleccionada; 
      const requests = group.integrantes.map(integrante => {
        return axios.post(`${API_BASE_URL}/asignaciones`, {
          id_evaluacion: evaluacionId,
          id_usuario: integrante.id,
          id_grupo: group.id,
          estado_evaluacion: 0
        });
        
      });
      console.log('requests:', requests);
      await Promise.all(requests);
      alert('Autoevaluaciones asignadas correctamente');
      obtenerAsignaciones();  // Llamar a obtenerAsignaciones después de asignar
    } catch (error) {
      console.error('Error al asignar autoevaluaciones:', error);
      alert('Error al asignar autoevaluaciones');
    }
  };

  const evaluacionPares = async (group) => {
    let grupoAsignado = false;
    if (!Array.isArray(asignaciones)) {
      console.error('Asignaciones no es un array:', asignaciones);
    }else{
      grupoAsignado = asignaciones.some(asignacion =>
        asignacion.id_evaluacion === parseInt(evaluacionSeleccionada) &&
        group.integrantes.some(integrante => asignacion.id_usuario === integrante.id)
      );
    }
    if (grupoAsignado) {
      alert('Este grupo ya está asignado a esta evaluación.');
      return;
    }
    try {
      const evaluacionId = evaluacionSeleccionada; 
      
      const response = await axios.get(`${API_BASE_URL}/pares/${group.id}/${evaluacionId}`);
        
      console.log('requests:', response);
      obtenerAsignaciones();  // Llamar a obtenerAsignaciones después de asignar
      alert('Evaluaciones por pares asignadas correctamente');
    } catch (error) {
      console.error('Error al asignar autoevaluaciones:', error);
      alert('Error al asignar evaluaciones por pares');
    }
  };

  const grupalAutoevaluacion = async(group) => {
    let grupoAsignado = false;
    if (!Array.isArray(asignaciones)) {
      console.error('Asignaciones no es un array:', asignaciones);
    }else{
      grupoAsignado = asignaciones.some(asignacion =>
        asignacion.id_evaluacion === parseInt(evaluacionSeleccionada) &&
        asignacion.id_grupo === group.id
      );
    }

    if (grupoAsignado) {
      alert('Este grupo ya está asignado a esta evaluación.');
      return;
    }
    try {
      const evaluacionId = evaluacionSeleccionada; 
      
      const response = await axios.post(`${API_BASE_URL}/asignaciones`, {
          id_evaluacion: evaluacionId,
          id_grupo: group.id,
          estado_evaluacion: 0
        });
        
      
      console.log('requests:', response);
      alert('Autoevaluaciones asignadas correctamente');
      obtenerAsignaciones();  // Llamar a obtenerAsignaciones después de asignar
    } catch (error) {
      console.error('Error al asignar autoevaluaciones:', error);
      alert('Error al asignar autoevaluaciones');
    }
  };

  const evaluacionCruzada = async(group, auxGroup) => {
    let grupoAsignado = false;
    if (!Array.isArray(asignaciones)) {
      console.error('Asignaciones no es un array:', asignaciones);
    }else{
      grupoAsignado = asignaciones.some(asignacion =>
        asignacion.id_evaluacion === parseInt(evaluacionSeleccionada) &&
        asignacion.id_grupo === group.id
      );
    }

    if (grupoAsignado) {
      alert('Este grupo ya está asignado a esta evaluación.');
      return;
    }

    if(group.id === auxGroup.id){
      alert('No puedes asignar una evaluación cruzada al mismo grupo');
      return;
    }
    try {
      const evaluacionId = evaluacionSeleccionada; 
      
      const response = await axios.post(`${API_BASE_URL}/asignaciones`, {
          id_evaluacion: evaluacionId,
          id_grupo: group.id,
          id_grupo_aux: auxGroup.id,
          estado_evaluacion: 0
        });
        
      
      console.log('requests:', response);
      obtenerAsignaciones();  // Llamar a obtenerAsignaciones después de asignar
      alert('Evaluacion cruzada asignada correctamente');
      setGrupoPrincipal(null);
      setGrupoAux(null);
    } catch (error) {
      console.error('Error al asignar autoevaluaciones:', error);
      alert('Error al asignar evaluaciones cruzadas');
    }
  };

  const handleAddAuxGroupClick = (group) => {
    setGrupoAux(group);
    // Aquí puedes llamar a la función para asignar la evaluación cruzada
    evaluacionCruzada(grupoPrincipal, group);
  };

  const handleViewGroupClick = (groupId) => {
    navigate(`/editarGrupo/${groupId}/1`);
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
              <button className="add-member-btn" onClick={() => handleAddMemberClick(group)}>
                <FaPlus /> {/* Icono de + */}
              </button>
              <p>{group.descripcion_grupo}</p>
              {(group.integrantes && group.integrantes.length > 0) ? (
                <div className="members">
                  <h4>Integrantes</h4>
                  <ul>
                    {group.integrantes.map((integrante, idx) => (
                      <li key={idx}>
                        {integrante.nombre}
                        {integrante.jefe === true && (
                          <span style={{ color: 'red', marginLeft: '10px' }}>Scrum Master</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <button className="view-group-btn" onClick={() => handleViewGroupClick(group.id)}>Ver Grupo</button>
                </div>
              ) : (
                <p>No hay miembros asignados.</p>
              )}
              {grupoPrincipal && grupoPrincipal.id === group.id && destinatarioVar === 'Grupal' && parseInt(tipo) === 2 && (
                <div>
                  <h4>Seleccione el Grupo que Será Evaluado:</h4>
                  {grupos.map((grupo) => (
                    <div key={grupo.id} className="group">
                      <div className="group-header" onClick={() => handleAddAuxGroupClick(grupo)}>
                        <span>{grupo.nombre_grupo}</span>
                        <FaPlus /> {/* Icono de + */}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Asignar;