import React from 'react';
import './Modal.css'; // Importa el archivo CSS para el modal

const ModalAgregar = ({ show, onClose, newName, setNewName, handleSave, titulo, autoevaluacion=false, setTipoEvaluacion=null, tipoEvaluacion=null  }) => {

    const handleTipoEvaluacionChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value === 0) {
          setTipoEvaluacion(false);
        } else if (value === 1) {
          setTipoEvaluacion(true);
        }
    };

    return (
        <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{titulo} </h4>
                        <button type="button" className="close" onClick={onClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="formEvaluationName">Ingrese el nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="formEvaluationName"
                                    placeholder="Ingresa el nombre"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                            </div>
                            {autoevaluacion && (
                                <div className="form-group">
                                <label htmlFor="formEvaluationType">Tipo de Evaluación</label>
                                <select
                                    className="form-control"
                                    id="formEvaluationType"
                                    value={tipoEvaluacion ? 1 : 0}
                                    onChange={handleTipoEvaluacionChange}
                                >
                                    <option value={0}>Individual</option>
                                    <option value={1}>Grupal</option>
                                </select>
                                </div>
                            )}
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" style={{ backgroundColor: '#09DDCC', color: 'black' }} onClick={onClose}>
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

export default ModalAgregar;