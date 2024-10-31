import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

import BotonAtras from "../General/BotonAtras";
import ModalEvaluacion from "./modales/ModalEvaluacion";
import "./estilos/PlanillaEvaluacionEvaluaciones.css";



const PlanillaEvaluacionEvaluaciones = () => {

    const [evaluaciones, setEvaluaciones] = useState([]);
    const [asignaciones, setAsignaciones] = useState([]);
    const [datosTabla, setDatosTabla] = useState([]);
    const [tipoFiltro, setTipoFiltro] = useState("");//para el tipo destinatario
    const [tipoEvaluacionFiltro, setTipoEvaluacionFiltro] = useState("");//para el tipo de evaluacion
    const [nombreGrupo, setNombreGrupo] = useState("");

    const [modalVisible, setModalVisible] = useState(false);
    const [evaluacionSeleccionada, setEvaluacionSeleccionada] = useState(null);
    
    const { idGrupo } = useParams();
    
    const obtenerNombreGrupo = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/grupos/${idGrupo}`); 
            setNombreGrupo(response.data.grupo.nombre_grupo);
        } catch (error) {
            console.error("Error al obtener los datos de la API", error);
        }
    }

    const obtenerEvaluaciones = async () => {
        try {
            const response2 = await axios.get(`${API_BASE_URL}/asignaciones`);
            const response = await axios.get(`${API_BASE_URL}/evaluaciones`);
            console.log(response2.data)
            //filtrar por evaluaciones grupo
            if(response.data.length > 0){
                setAsignaciones(response2.data);
                setEvaluaciones(response.data);
            }else{
                setEvaluaciones([]);
            }
        } catch (error) {
            console.error("Error al obtener los datos de la API", error);
        }
    }
    const obtenerAsignaciones = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/planilla-evaluacion-datos/${idGrupo}`);
            console.log(response.data.asignaciones)
            if(response.data.asignaciones.length > 0){
                setAsignaciones(response.data.asignaciones);
                setDatosTabla(response.data.asignaciones);
                console.log('asignaciones', asignaciones)
            }else{
                setAsignaciones([]);
            }
        } catch (error) {
            console.error("Error al obtener los datos de la API", error);
        }
    }


    useEffect(() => {
        obtenerNombreGrupo();
        obtenerAsignaciones();
    }, [idGrupo]);


    const handleFiltroChange = (event) => {
        setTipoFiltro(event.target.value);
    };
    const handleTipoEvaluacionFiltroChange = (event) => {
        setTipoEvaluacionFiltro(event.target.value);
    };

    const datosFiltrados = datosTabla.filter(dato => {
        return (tipoFiltro === "" || dato.tipo_destinatario === tipoFiltro) &&
               (tipoEvaluacionFiltro === "" || dato.tipo_evaluacion === tipoEvaluacionFiltro);
    });

    const abrirModal = (evaluacion) => {
        setEvaluacionSeleccionada(evaluacion);
        setModalVisible(true);
    };

    const cerrarModal = () => {
        setModalVisible(false);
        setEvaluacionSeleccionada(null);
    };

    return(
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h2>Grupo: {nombreGrupo}</h2>
            </div>
            <div style={{ display: 'flex', justifyContent:"space-between", alignItems: 'center' }}>
            <h3>Planilla evaluación - Evaluaciones</h3>
            <BotonAtras/>
            </div>

            <div className="container-filtros">
                <div>
                    <label htmlFor="tipoFiltro">Filtrar por tipo de destinatario:</label>
                    <select id="tipoFiltro" value={tipoFiltro} onChange={handleFiltroChange}>
                        <option value="">Todos</option>
                        <option value="Individual">Individual</option>
                        <option value="Grupal">Grupal</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="tipoEvaluacionFiltro">Filtrar por tipo de evaluación:</label>
                    <select id="tipoEvaluacionFiltro" value={tipoEvaluacionFiltro} onChange={handleTipoEvaluacionFiltroChange}>
                        <option value="">Todos</option>
                        <option value="Autoevaluación">Autoevaluación</option>
                        <option value="Evaluación Cruzada">Evaluación Cruzada</option>
                        <option value="Evaluación en Pares">Evaluación en Pares</option>
                        {/* Añade más opciones según tus tipos de evaluación */}
                    </select>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Grupal/Individual</th>
                        <th>Tipo de Evaluación</th>
                        <th>Estudiante</th>
                    </tr>
                </thead>
                <tbody>
                    {datosFiltrados.map((dato, index) => (
                        <tr key={index}>
                            <td id="eva-table"><a onClick={() => abrirModal(dato)}>{dato.nombre_evaluacion}</a></td>
                            <td>{dato.tipo_destinatario}</td>
                            <td>{dato.tipo_evaluacion}</td>
                            <td>{dato.nombre_estudiante}</td>
                            {/* Añade más celdas según tus necesidades */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalEvaluacion 
                visible={modalVisible} 
                onClose={cerrarModal} 
                evaluacion={evaluacionSeleccionada} 
            />
        </div>
    );
}

export default PlanillaEvaluacionEvaluaciones;