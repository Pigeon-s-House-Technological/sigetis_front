import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const endPoint = `${API_BASE_URL}/usuarios`;

const AsignarUsuario = ({ show, onHide, handleAsignarUsuario, currentTask }) => {
  const [selectedUser, setSelectedUser] = useState(currentTask?.assigned || '');
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(endPoint);
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error.response ? error.response.data : error.message);
      }
    };

    fetchUsuarios();
  }, []);

  const handleChange = (e) => {
    const usuario = JSON.parse(e.target.value);
    setSelectedUser(usuario); // Almacena el objeto completo del usuario
  };

  const handleAssign = () => {
    handleAsignarUsuario(selectedUser); // Envía el objeto del usuario completo
    onHide(); 
  };

  if (!show) return null;

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <h2>Asignar usuario</h2>
        <select value={JSON.stringify(selectedUser)} onChange={handleChange}>
          <option value="">No asignado</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={JSON.stringify(usuario)}>
              {usuario.nombre_user} {usuario.apellido_user}
            </option>
          ))}
        </select>
        <div className="mt-3">
          <button className="btn btn-primary" onClick={handleAssign}>
            Asignar
          </button>
          <button className="btn btn-secondary" onClick={onHide}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AsignarUsuario;