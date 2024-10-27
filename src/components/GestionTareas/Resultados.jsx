import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BsPencilSquare, BsTrashFill } from 'react-icons/bs';
import { API_BASE_URL } from '../config';

import AgregarResultado from './Modales/AgregarResultado';
import BotonAtras from '../General/BotonAtras';
import ModalEliminar from '../General/Modales/ModalEliminar';

const Resultados = () => {
  const { idActividad } = useParams();
  const [resultados, setResultados] = useState([]);
  const [expandedResult, setExpandedResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [resultadoActual, setResultadoActual] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedResultadoId, setSelectedResultadoId] = useState(null);

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/resultados`);
        const filteredData = response.data.filter((resultado) => resultado.id_actividad === parseInt(idActividad));
        
        const observacionesResponse = await axios.get(`${API_BASE_URL}/observaciones`);
        const observaciones = observacionesResponse.data;

        const dataWithObservaciones = filteredData.map((resultado) => {
          const observacion = observaciones.find(obs => obs.id_resultado === resultado.id);
          return { ...resultado, observacion: observacion ? observacion.observacion : null };
        });
        console.log(dataWithObservaciones);
        if (Array.isArray(dataWithObservaciones)) {
          setResultados(dataWithObservaciones);
        } else if (dataWithObservaciones && typeof dataWithObservaciones === 'object') {
          setResultados([dataWithObservaciones]); // Convertir el objeto en un array
        } else {
          console.error('La respuesta de la API no es un array ni un objeto:', dataWithObservaciones);
          setResultados([]);
        }
      } catch (error) {
        console.error('Error al obtener los resultados:', error);
        setResultados([]);
      }
    };

    fetchResultados();
  }, [idActividad]);

  const handleExpand = (id) => {
    setExpandedResult(expandedResult === id ? null : id);
  };

  const editarClick = (resultado) => {
    setResultadoActual(resultado);
    setShowModal(true);
  }

  const eliminarClick = (id) => {
    setSelectedResultadoId(id);
    setShowConfirmModal(true);
  }

  const crearClick = () => {
    setResultadoActual(null);
    setShowModal(true);
  }

  const handleSave = async (nuevoResultado) => {
    if (resultadoActual) {
      // Editar resultado existente
      try {
        const response = await axios.patch(`${API_BASE_URL}/resultadosP/${resultadoActual.id}`, nuevoResultado);
        setResultados(resultados.map((resultado) => (resultado.id === resultadoActual.id ? response.data.elemento : resultado)));
      } catch (error) {
        console.error('Error al editar el resultado:', error);
      }
    } else {
      // Crear nuevo resultado
      try {
        const response = await axios.post(`${API_BASE_URL}/resultados`, { ...nuevoResultado, id_actividad: idActividad });
        setResultados([...resultados, response.data]);
      } catch (error) {
        console.error('Error al crear el resultado:', error);
      }
    }
    setShowModal(false);
    setResultadoActual(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/resultados/${selectedResultadoId}`);
      setResultados(resultados.filter((resultado) => resultado.id !== selectedResultadoId));
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Error al eliminar la autoevaluación', error);
    }
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };


  return (
    <div className='container'>
      <h2>Resultados de la Actividad {idActividad}</h2>
      <div className='col col-button'>
          <Button style={{backgroundColor: '#007BFF'}} className="btn-custom-primary" onClick={crearClick}>Agregar Resultado</Button>
      </div>
        <BotonAtras />
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Nombre del Elemento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map((resultado, index) => (
            <React.Fragment key={resultado.id}>
              <tr>
                <td>{index +1}</td>
                <td>
                  <span className="expand-icon" onClick={() => handleExpand(resultado.id)}>
                    {expandedResult === resultado.id ? '-' : '▼'}
                  </span>
                </td>
                <td>{resultado.nombre_elemento}</td>
                <td>
                  <div className="actions">
                    <Button style={{ backgroundColor: '#09DDCC', color: 'black' }} className="btn-custom-warning" onClick={() => editarClick(resultado)}>
                        <BsPencilSquare />
                    </Button>
                    {' '}
                    <Button style={{ backgroundColor: 'red' }} className="btn-custom-danger" onClick={() => eliminarClick(resultado.id)}>
                        <BsTrashFill />
                    </Button>
                  </div>
                </td>
              </tr>
              {expandedResult === resultado.id && (
                <tr>
                  <td colSpan="3">
                    <div>
                      <p>Descripción: {resultado.descripcion_elemento}</p>
                      {resultado.link_elemento && (
                        <p>Link:<br /> 
                          <a href={resultado.link_elemento} target="_blank" rel="noopener noreferrer">
                            {resultado.link_elemento}
                          </a>
                        </p>
                      )}
                      <p style={{color:"red"}}>Observaciones: {resultado.observacion}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <AgregarResultado
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSave}
        resultado={resultadoActual}
      />

      <ModalEliminar
                show={showConfirmModal}
                onClose={handleCloseConfirmModal}
                handleConfirmDelete={handleConfirmDelete}
                titulo={"el resultado"}
      />
    </div>
  );
};

export default Resultados;