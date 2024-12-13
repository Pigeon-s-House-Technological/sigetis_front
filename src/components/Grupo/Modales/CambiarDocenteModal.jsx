import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const CambiarDocenteModal = ({ show, handleClose, idTutor, idGrupo, onDocenteChange }) => {
    const [docentes, setDocentes] = useState([]);
    const [selectedDocente, setSelectedDocente] = useState(idTutor || '');
    

    useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/usuariosTipo/1`);
        setDocentes(response.data);
      } catch (error) {
        console.error('Error al obtener los docentes:', error);
      }
    };

    fetchDocentes();
  }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.get(`${API_BASE_URL}/asignarDocente/${selectedDocente}/${idGrupo}`);
            handleClose();
            onDocenteChange(); 
        } catch (error) {
            console.error('Error al asignar el docente:', error);
        }
    };
  
    return (
        <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Cambiar Docente</h5>
            <button type="button" className="close" onClick={handleClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="formDocente">Nuevo Docente</label>
                <select
                  className="form-control"
                  id="formDocente"
                  value={selectedDocente}
                  onChange={(e) => setSelectedDocente(e.target.value)}
                  required
                >
                  <option value="" disabled>Seleccione un docente</option>
                  {docentes.map((docente) => (
                    <option key={docente.id} value={docente.id}>
                      {docente.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#007BFF' }}>
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
};

export default CambiarDocenteModal;