import React, { useState, useEffect } from 'react';
import './Modal.css';

const AgregarResultado = ({ show, handleClose, handleSave, resultado }) => {
  const [nombreElemento, setNombreElemento] = useState('');
  const [descripcionElemento, setDescripcionElemento] = useState('');
  const [linkElemento, setLinkElemento] = useState('');

  useEffect(() => {
    if (resultado) {
      setNombreElemento(resultado.nombre_elemento);
      setDescripcionElemento(resultado.descripcion_elemento);
      setLinkElemento(resultado.link_elemento);
    } else {
      setNombreElemento('');
      setDescripcionElemento('');
      setLinkElemento('');
    }
  }, [resultado]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoResultado = {
      nombre_elemento: nombreElemento,
      descripcion_elemento: descripcionElemento,
      link_elemento: linkElemento,
    };
    handleSave(nuevoResultado);
  };

  const handleLinkChange = (e) => {
    let value = e.target.value;
    if (value && !/^https?:\/\//i.test(value)) {
      value = 'http://' + value;
    }
    setLinkElemento(value);
  };

  return (
    <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{resultado ? 'Editar Resultado' : 'Agregar Resultado'}</h4>
            <button type="button" className="close" onClick={handleClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="formNombreElemento">Nombre del Elemento</label>
                <input
                  type="text"
                  className="form-control"
                  id="formNombreElemento"
                  placeholder="Ingresa el nombre del elemento"
                  value={nombreElemento}
                  onChange={(e) => setNombreElemento(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="formDescripcionElemento">Descripción del Elemento</label>
                <textarea
                  className="form-control"
                  id="formDescripcionElemento"
                  rows={3}
                  placeholder="Ingresa la descripción del elemento"
                  value={descripcionElemento}
                  onChange={(e) => setDescripcionElemento(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="formLinkElemento">Link del Elemento</label>
                <input
                  type="text"
                  className="form-control"
                  id="formLinkElemento"
                  placeholder="Ingresa el link del elemento"
                  value={linkElemento}
                  onChange={handleLinkChange}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" style={{ backgroundColor: '#09DDCC', color: 'black' }} onClick={handleClose}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#007BFF' }}>
                  {resultado ? 'Guardar Cambios' : 'Agregar Resultado'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgregarResultado;