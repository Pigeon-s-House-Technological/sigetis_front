import React from 'react';
import './Modal.css'; // Importa el archivo CSS para el modal

const ModalEvaluacion = ({ visible, onClose, evaluacion }) => {
    if (!visible) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <div className='modal-header'>
                <h2>{evaluacion.nombre}</h2>
                <span className="close" onClick={onClose}>&times;</span>
                </div>
                
                <p>Este es un modal gaaaaaaaaaa</p>
                <hr></hr>
            </div>
        </div>
    );
};

export default ModalEvaluacion;