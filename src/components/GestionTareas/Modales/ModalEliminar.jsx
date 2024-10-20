import React from 'react';
import './Modal.css'; // Importa el archivo CSS para el modal

const ModalEliminar = ({ show, onClose, handleConfirmDelete }) => {
    return (
        <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirmar Eliminación</h5>
                        <button type="button" className="close" onClick={onClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        ¿Estás seguro de que deseas eliminar esta autoevaluación?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" style={{ backgroundColor: '#09DDCC', color: 'black' }} onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-danger" style={{ backgroundColor: 'red' }} onClick={handleConfirmDelete}>
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalEliminar;