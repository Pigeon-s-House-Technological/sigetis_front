import React, { useState } from 'react';
import './Modal.css'; // Importa el archivo CSS para el modal

const ModalAgregarHU = ({ show, onClose, newName, setNewName, handleSave, titulo  }) => {

    const [error, setError] = useState('');

    const handleSaveClick = () => {
        if (!newName.trim()) {
            setError('El nombre de la Historia de Usuario es obligatorio.');
        } else {
            setError('');
            handleSave();
        }
    };

    return (
        <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{titulo}</h5>
                        <button type="button" className="close" onClick={onClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                        <div className="form-group">
                            <label htmlFor="formEvaluationName">Nombre de la Historia de Usuario</label>
                            <input
                            type="text"
                            className="form-control"
                            id="formEvaluationName"
                            placeholder="Ingresa el nombre de la historia de usuario"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            />
                            {error && <div className="text-danger">{error}</div>}
                        </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" style={{ backgroundColor: '#09DDCC', color: 'black' }} onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-primary" style={{ backgroundColor: '#007BFF' }} onClick={handleSaveClick}>
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalAgregarHU;