import React from 'react';
import './Modal.css';

const AsignarModal = ({ show, integrantes, onClose, onAsignar, onSelectIntegrante }) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h4>Asignar Tarea a Integrante</h4>
        <select onChange={(e) => onSelectIntegrante(parseInt(e.target.value))}>
          <option value="">Selecciona un integrante</option>
          {integrantes.map(integrante => (
            <option key={integrante.id} value={integrante.id}>
              {integrante.nombre}
            </option>
          ))}
        </select>
        <button onClick={onAsignar}>Asignar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default AsignarModal;