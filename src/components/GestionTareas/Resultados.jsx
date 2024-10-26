import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BsPencilSquare, BsTrashFill } from 'react-icons/bs';
import { API_BASE_URL } from '../config';

const Resultados = () => {
  const { idActividad } = useParams();
  const [resultados, setResultados] = useState([]);
  const [expandedResult, setExpandedResult] = useState(null);

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/resultados`);
        const filteredData = response.data.filter((resultado) => resultado.id_actividad === parseInt(idActividad));
        const data = filteredData;
        if (Array.isArray(data)) {
          setResultados(data);
          
        } else if (data && typeof data === 'object') {
          setResultados([data]); // Convertir el objeto en un array
        } else {
          console.error('La respuesta de la API no es un array ni un objeto:', data);
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

  const editarClick = (id) => {}

  const eliminarClick = (id) => {}

  const crearClick = () => {}

  return (
    <div className='container'>
      <h2>Resultados de la Actividad {idActividad}</h2>
      <div className='col col-button'>
          <Button style={{backgroundColor: '#007BFF'}} className="btn-custom-primary" onClick={crearClick}>Agregar Resultado</Button>
      </div>
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
                    <Button style={{ backgroundColor: '#09DDCC', color: 'black' }} className="btn-custom-warning" onClick={() => editarClick(resultado.id)}>
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
                      <p>Observaciones: {resultado.calificacion}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Resultados;