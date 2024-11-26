import React, { useState, useEffect } from 'react';
import './ResultadosModal.css'; // Importar el archivo CSS
import axios from 'axios';
import { API_BASE_URL } from '../../config';
const ResultadosModal = ({ show, handleClose, resultados }) => {
  const [observaciones, setObservaciones] = useState({});

  useEffect(() => {
    if (show) {
      const fetchObservaciones = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/observaciones`);
          const observacionesData = response.data;
          const initialObservaciones = {};
          resultados.forEach(resultado => {
            const observacion = observacionesData.find(obs => obs.id_resultado === resultado.id);
            initialObservaciones[resultado.id] = observacion ? observacion : { observacion: '' };
          });

          setObservaciones(initialObservaciones);
          console.log('Observaciones obtenidas:', initialObservaciones);
        } catch (error) {
          console.error('Error al obtener las observaciones:', error);
        }
      };

      fetchObservaciones();
    }
  }, [show, resultados]);

  const handleObservacionChange = (id, value) => {
    setObservaciones(prevObservaciones => ({
      ...prevObservaciones,
      [id]: { ...prevObservaciones[id], observacion: value }
    }));
  };

  const handleSave = async () => {
    try {
      for (const resultado of resultados) {
        const observacionData = observaciones[resultado.id];
        if (observacionData.id) {
          // Si la observación ya existe, usa PATCH para actualizarla
          await axios.patch(`${API_BASE_URL}/observacionesP/${observacionData.id}`, {
            observacion: observacionData.observacion
          });
        } else {
          // Si la observación no existe, usa POST para crearla
          await axios.post(`${API_BASE_URL}/observaciones`, {
            id_resultado: resultado.id,
            observacion: observacionData.observacion
          });
        }
      }
      console.log('Observaciones guardadas:', observaciones);
    } catch (error) {
      console.error('Error al guardar las observaciones', error);
    }
    handleClose();
  };

  if (!resultados || resultados.length === 0) {
    return null;
  }

  return (
    <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Detalles de los Resultados</h4>
            <button type="button" className="close" onClick={handleClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <ul>
              {resultados.map((resultado, index) => (
                <li key={resultado.id}>
                  <h5>Resultado {index + 1}</h5>
                  <ul>
                    <li><strong>Nombre del Elemento:</strong> {resultado.nombre_elemento}</li>
                    <li><strong>Descripción del Elemento:</strong> {resultado.descripcion_elemento}</li>
                    <li><strong>Link del Elemento: </strong> 
                    <a href={resultado.link_elemento} target="_blank" rel="noopener noreferrer" className="break-word">
                      {resultado.link_elemento}
                    </a>
                    </li>
                    <li>
                      <strong>Observación:</strong>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={observaciones[resultado.id]?.observacion || ''}
                        onChange={(e) => handleObservacionChange(resultado.id, e.target.value)}
                      />
                    </li>
                  </ul>
                  <hr />
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" style={{ backgroundColor: '#09DDCC', color: 'black' }} onClick={handleClose}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" style={{ backgroundColor: '#007BFF' }} onClick={handleSave}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultadosModal;