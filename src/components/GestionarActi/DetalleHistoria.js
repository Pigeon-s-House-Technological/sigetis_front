import React from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function DetalleHistoria() {
  const location = useLocation();
  const { historia } = location.state || {};

  if (!historia) {
    return <div className="alert alert-warning" role="alert">No hay historia seleccionada</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">HISTORIA DE USUARIO</h1>
      <div className="card p-3 mb-3">
        <h2>Descripción</h2>
        <p>{historia.description || 'No proporcionado'}</p>
      </div>
      <div className="card p-3 mb-3">
        <h2>Archivos Adjuntos</h2>
        {historia.images && historia.images.length > 0 ? (
          <>
            <p>{historia.images.length} archivos adjuntos</p>
            {/* Aquí puedes agregar una lista o vista previa de los archivos adjuntos */}
          </>
        ) : (
          <p>No hay archivos adjuntos.</p>
        )}
        <button className="btn btn-primary">+ Agregar Archivo</button>
      </div>
      <div className="card p-3 mb-3">
        <h2>Tareas</h2>
        {/* Aquí puedes agregar una lista o formulario para agregar tareas */}
        <button className="btn btn-primary">+ Agregar Tarea</button>
      </div>
    </div>
  );
}

export default DetalleHistoria;
