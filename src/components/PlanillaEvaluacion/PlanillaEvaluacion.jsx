import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

import "./PlanillaEvaluacion.css";

const PlanillaEvaluacion = () => {
  const [activeType, setActiveType] = useState("evaluaciones");
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const navigate = useNavigate();

  const idTutor = 2;
  
  const obtenerGrupos = async () => {
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
  }, []);

  const handleEvaluationClick = (evaluation) => {
    if (evaluation.route) {
      navigate(evaluation.route);  // Navegamos a la ruta si está definida
    }
  };

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
