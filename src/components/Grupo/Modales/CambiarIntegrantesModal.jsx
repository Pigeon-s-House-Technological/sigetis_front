import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsTrashFill } from 'react-icons/bs';
import { API_BASE_URL } from '../../config';
import { toast } from 'react-toastify';

import "./Modal.css";

const CambiarIntegrantesModal = ({ show, handleClose, idGrupo, onDocenteChange }) => {
    const [integrantes, setIntegrantes] = useState([]);
    const [integrantesDisponibles, setIntegrantesDisponibles] = useState([]);
    const [mostrarComboBox, setMostrarComboBox] = useState(false);
    const [selectedIntegrante, setSelectedIntegrante] = useState('')

    useEffect(() => {
        const fetchIntegrantes = async () => {
          try {
            const response = await axios.get(`${API_BASE_URL}/gruposUsuarios/integrantes/${idGrupo}`);
            setIntegrantes(response.data.integrantes);
          } catch (error) {
            console.error('Error al obtener los integrantes:', error);
            toast.error('Error al obtener los integrantes.');
          }
        };
    
        if (show) {
          fetchIntegrantes();
        }
      }, [show, idGrupo]);

      const fetchIntegrantesDisponibles = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/usuariosSG`);
          setIntegrantesDisponibles(response.data.usuarios || []);
          console.log("integrantes disponibles", response.data);
        } catch (error) {
          console.error('Error al obtener los integrantes disponibles:', error);
          toast.error('Error al obtener los integrantes disponibles.');
        }
      };
    
      const handleDeleteIntegrante = async (idIntegrante) => {
        try {
          await axios.delete(`${API_BASE_URL}/eliminarIntegrante/${idIntegrante}/${idGrupo}`);
          setIntegrantes(integrantes.filter(integrante => integrante.id !== idIntegrante));
          toast.success('Integrante eliminado exitosamente.');
        } catch (error) {
          console.error('Error al eliminar el integrante:', error);
          toast.error('Error al eliminar el integrante.');
        }
      };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setMostrarComboBox(false);
      handleClose();
    };

    const handleAgregar = async () => {
        setMostrarComboBox(true);
        await fetchIntegrantesDisponibles();
    };

    const handleAgregarIntegrante = async () => {
        try {
        
          await axios.post(`${API_BASE_URL}/usuariosGrupos`, { id_usuario: selectedIntegrante, id_grupo: idGrupo });
          const response = await axios.get(`${API_BASE_URL}/usuarios/${selectedIntegrante}`);
          const integrante = response.data.usuario;
          console.log("response", response.data.usuario);
          setIntegrantes([...integrantes, { id: selectedIntegrante, nombre: integrante.nombre }]);
          setIntegrantesDisponibles(integrantesDisponibles.filter(integrante => integrante.id !== selectedIntegrante));
          setSelectedIntegrante('');
          setMostrarComboBox(false);
          onDocenteChange();
          toast.success('Integrante agregado exitosamente.');
        } catch (error) {
          console.error('Error al agregar el integrante:', error);
          toast.error('Error al agregar el integrante.');
        }
    };

    const resetComboBox = () => {
        setMostrarComboBox(false);
        setSelectedIntegrante('');
    };
  
    return (
        <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cambiar Integrantes</h5>
                <button type="button" className="close" onClick={() => { resetComboBox(); handleClose(); }} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  {integrantes.map((integrante, index) => (
                    <div className="form-group integrante-row" key={index}>
                        <p id={`formIntegrante${index}`} className="form-control-static">
                            {index+1}. {integrante.nombre || ''}
                        </p>
                      <button type="button" className="btn btn-danger" onClick={() => handleDeleteIntegrante(integrante.id)}>
                      <BsTrashFill />
                      </button>
                    </div>
                  ))}
                    {mostrarComboBox && (
                        <div className="form-group">
                        <label htmlFor="integranteSelect">Agregar Integrante</label>
                        <select
                            id="integranteSelect"
                            className="form-control"
                            value={selectedIntegrante}
                            onChange={(e) => setSelectedIntegrante(e.target.value)}
                        >
                            <option value="">Seleccione un integrante</option>
                            {Array.isArray(integrantesDisponibles) && integrantesDisponibles.map((integrante) => (
                            <option key={integrante.id} value={integrante.id}>
                                {integrante.nombre}
                            </option>
                            ))}
                        </select>
                        <button type="button" className="btn btn-primary" onClick={handleAgregarIntegrante} style={{ marginTop: '10px' }}>
                            Agregar
                        </button>
                        </div>
                    )}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <button type="button" className="btn btn-secondary" onClick={handleAgregar}>
                      Agregar
                    </button>
                    <button type="submit" className="btn btn-primary" >
                      Aceptar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
};

export default CambiarIntegrantesModal;