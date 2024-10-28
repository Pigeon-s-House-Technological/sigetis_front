import React, { useState } from 'react';


const ModalUsuarios = ({ show, handleClose, usuarios }) => {
  return (
    <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Lista de estudiantes del grupo</h4>
            <button type="button" className="close" onClick={handleClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <ul>
              {usuarios.map((usuario) => (
                <li key={usuario.id}>
                  Usuario: {usuario.usuario} <br />
                  Contraseña: {usuario.contraseña} <br />
                  {usuario.tipo_usuario === 2 ? 'Jefe' : 'Estudiante'}
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" style={{ backgroundColor: '#09DDCC', color: 'black' }} onClick={handleClose}>
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUsuarios;