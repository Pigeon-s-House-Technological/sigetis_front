import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from "../config";

import "./estilos/PlanillaEvaluacionActividades.css";
import BotonAtras from "../General/BotonAtras";
import ResultadosModal from "./modales/ResultadosModal";

const PlanillaEvaluacionActividades = () => {


    const [nombreGrupo, setNombreGrupo] = useState("");
    const [sprints, setSprints] = useState([]);
    const [datosTabla, setDatosTabla] = useState([]);
    const [historias, setHistorias] = useState([]);
    const [actividades, setActividades] = useState([]);
    const [selectedSprint, setSelectedSprint] = useState(null);
    const [selectedHistoria, setSelectedHistoria] = useState(null);
    const [resultados, setResultados] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [resultadosActuales, setResultadosActuales] = useState([]);
    
    const { idGrupo } = useParams();
    
    const obtenerNombreGrupo = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/grupos/${idGrupo}`); 
            setNombreGrupo(response.data.grupo.nombre_grupo);
        } catch (error) {
            console.error("Error al obtener los datos de la API", error);
        }
    }

    const fetchHistorias = async (sprintId) => {
        try {
          const response = await axios.get(`${API_BASE_URL}/historiaUsuarios`);
          const sprintIdNumber = parseInt(sprintId, 10);
          const filtradas = response.data.filter(historia => historia.id_sprint === sprintIdNumber);
          setHistorias(filtradas);
        } catch (error) {
          console.error("Error al obtener las historias:", error.response ? error.response.data : error.message);
        }
      };

    const fetchSprints = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/sprints`);
          const filtradas = response.data.filter(sprint => sprint.id_grupo === parseInt(idGrupo));
          
          if(filtradas.length > 0){
              setSprints(filtradas);
            }else{
                setSprints([]);
            }
            
        } catch (error) {
          console.error("Error al obtener los sprints:", error.response ? error.response.data : error.message);
        }
    };
    
    
      // Fetch tasks
    const fetchActividades = async (historiaId) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/reporte/grupo/${idGrupo}`);
  
        // Filtrar las actividades por historiaId
        const actividadesFiltradas = [];
        response.data.forEach(sprint => {
          sprint.historias_usuarios.forEach(historia => {
            if (historia.id_hu === parseInt(historiaId)) {
              actividadesFiltradas.push(...historia.actividades);
            }
          });
        });
  
        setActividades(actividadesFiltradas);
        console.log("actividadesFiltradas", actividadesFiltradas);
      } catch (error) {
        console.error("Error al obtener las actividades:", error.response ? error.response.data : error.message);
      }
    };

    const fetchResultados = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/resultados`);
        setResultados(response.data);
      } catch (error) {
        console.error("Error al obtener los resultados:", error.response ? error.response.data : error.message);
      }
    };
      
    useEffect(() => {
        obtenerNombreGrupo();
        fetchSprints();
        fetchResultados();
    }, [idGrupo]);

    useEffect(() => {
        generarDatosActividades();
    }, [actividades]);


    const handleSprintChange = (event) => {
        const sprintId = event.target.value;
        setSelectedSprint(sprintId);
        setSelectedHistoria(null); // Resetear la historia seleccionada
        setActividades([]); // Limpiar las actividades
        fetchHistorias(sprintId);
      };
    
      const handleHistoriaChange = (event) => {
        const historiaId = event.target.value;
        setSelectedHistoria(historiaId);
        fetchActividades(historiaId);
      };

    const generarDatosActividades = () => {
        const datos = [];
        if (actividades.length > 0) {
            actividades.forEach((actividad) => {
                datos.push({
                    id: actividad.id,
                    nombre_actividad: actividad.actividad,
                    encargado: obtenerEncargado(actividad.encargado),
                    estado_actividad: obtenerEstado(actividad.estado_actividad),
                    fecha_inicio: actividad.fecha_inicio,
                    fecha_fin: actividad.fecha_fin
                });
            });
        }
        setDatosTabla(datos);
    }

    const handleVerResultados = (actividadId) => {
      const resultadosActividad = resultados.filter(res => res.id_actividad === actividadId);
      setResultadosActuales(resultadosActividad);
      setShowModal(true);
    };

    const obtenerEncargado = (id) => {
        if(id === null){
            return "Sin asignar";
        }
        return `${id}`;
    }

    const obtenerEstado = (estado) => {
        if(estado === 1){
            return "Pendiente";
        }else if(estado === 2){
            return "En progreso";
        }else{
            return "Finalizado";
        }
    }


    return(
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h2>Grupo: {nombreGrupo}</h2>
            </div>
            <div style={{ display: 'flex', justifyContent:"space-between", alignItems: 'center' }}>
            <h3>Planilla evaluación - Actividades</h3>
            <BotonAtras/>
            </div>

            <div className="container-filtros">
                <div>
                    <label htmlFor="tipoFiltro">Seleccione un Sprint:</label>
                    <select id="sprintSelect" onChange={handleSprintChange}>
                        <option value="">--Selecciona un Sprint--</option>
                        {sprints.map(sprint => (
                            <option key={sprint.id} value={sprint.id}>Sprint {sprint.numero_sprint}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="tipoEvaluacionFiltro">Filtrar por tipo Historia de Usuario:</label>
                    <select id="historiaSelect" onChange={handleHistoriaChange} disabled={!selectedSprint}>
                        <option value="">--Selecciona una Historia de Usuario--</option>
                        {historias.map(historia => (
                            <option key={historia.id} value={historia.id}>{historia.titulo_hu}</option>
                        ))}
                    </select>
                </div>
            </div>

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Asignado</th>
              <th>Estado</th>
              <th>Fecha inicio</th>
              <th>Fecha fin</th>
              <th>Resultado</th>
            </tr>
          </thead>
          <tbody>
            {datosTabla.map((task) => (
              <tr key={task.id}>
                <td>{task.nombre_actividad}</td>
                <td>{task.encargado}</td>
                <td>{task.estado_actividad}</td>
                <td>{task.fecha_inicio}</td>
                <td>{task.fecha_fin}</td>
                <td>
                  <button className="btn-resultados" onClick={() => handleVerResultados(task.id)}>
                    Ver resultados
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ResultadosModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          resultados={resultadosActuales}
        />

        </div>
    );
}

export default PlanillaEvaluacionActividades;