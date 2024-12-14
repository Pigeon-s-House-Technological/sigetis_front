import React, { useState, useEffect } from "react";
import axios from "axios";
import {  Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

import "./estilos/PlanillaEvaluacion.css";

const PlanillaEvaluacion = () => {
  const [activeType, setActiveType] = useState("evaluaciones");
  const [grupos, setGrupos] = useState([]);

  const [idTutor, setIdTutor] = useState(null); // Reemplaza con el ID del tutor logueado

  const obtenerId = async () => {
    const id = localStorage.getItem('user');
    const idParsed = JSON.parse(id);
    setIdTutor(idParsed.userData.id);
  }

  
  const obtenerGrupos = async () => {
    await obtenerId();
    try {
      const response = await axios.get(`${API_BASE_URL}/grupos`); // Reemplaza con la URL de tu API
      const gruposFiltrados = response.data.filter((grupo) => grupo.id_tutor === idTutor);
      setGrupos(gruposFiltrados);
    } catch (error) {
      console.error("Error al obtener los datos de la API", error);
    }
  }

  useEffect(() => {
    obtenerGrupos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idTutor]);

  return (
    <div className="planilla-type">
      <div className="planilla-header">
        <h2>Planilla de Evaluación</h2>
      </div>

      {/* Botones para elegir el tipo de evaluación */}
      <div className="planilla-toggle">
        <button
          className={`planilla-toggle-btn ${activeType === "evaluaciones" ? "active" : ''}`}
          onClick={() => setActiveType("evaluaciones")}
        >
          Evaluaciones
        </button>
        <button
          className={`planilla-toggle-btn ${activeType === "actividades" ? "active" : ''}`}
          onClick={() => setActiveType("actividades")}
        >
          Actividades
        </button>
      </div>

      <h3 style={{ marginBottom: "2%" }}>Lista de grupos</h3>
      {/* Listado de evaluaciones dinámico según el tipo seleccionado */}
      <div className="planilla-list">
        {grupos.map((grupo, index) => (
          <Link to={`/planilla/${activeType}/${grupo.id}`} key={index} className="planilla-item-link">
            <div key={index} className="planilla-item">
                <div>
                <h5>{grupo.nombre_grupo}</h5>
                <p>{grupo.descripcion_grupo}</p>
                </div>
                <div className="arrow">▶</div>
            </div>
          </Link >
        ))}
      </div>
    </div>
  );
};

export default PlanillaEvaluacion;
