import React, { useState, useEffect, useRef } from 'react';
import { FaBell } from 'react-icons/fa';
import './Notificaciones.css'; // Importa el archivo CSS para los estilos

const Notificaciones = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificaciones, setNotificaciones] = useState([
    { id: 1, mensaje: 'Notificación 1', timestamp: new Date() },
    { id: 2, mensaje: 'Notificación 2 con un mensaje un poco largo para la utilizacion', timestamp: new Date(Date.now() - 60000) }, // Hace 1 minuto
    { id: 3, mensaje: 'Notificación 3', timestamp: new Date(Date.now() - 3600000) },
    { id: 3, mensaje: 'Notificación 3', timestamp: new Date(Date.now() - 3600000) },
    { id: 3, mensaje: 'Notificación 3', timestamp: new Date(Date.now() - 3600000) },
    { id: 3, mensaje: 'Notificación 3', timestamp: new Date(Date.now() - 3600000) },
    { id: 3, mensaje: 'Notificación 3', timestamp: new Date(Date.now() - 3600000) },
  ]);

  const notificacionesRef = useRef(null);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    console.log('notificaciones', notificaciones);
  };

  const handleClickOutside = (event) => {
    if (notificacionesRef.current && !notificacionesRef.current.contains(event.target)) {
      setShowNotifications(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const calcularTiempoTranscurrido = (timestamp) => {
    const ahora = new Date();
    const diferencia = ahora - new Date(timestamp);
    const minutos = Math.floor(diferencia / 60000);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (dias > 0) {
      return `${dias} día${dias > 1 ? 's' : ''} atrás`;
    } else if (horas > 0) {
      return `${horas} hora${horas > 1 ? 's' : ''} atrás`;
    } else if (minutos > 0) {
      return `${minutos} minuto${minutos > 1 ? 's' : ''} atrás`;
    } else {
      return 'Justo ahora';
    }
  };

  return (
    <div className="notificaciones" ref={notificacionesRef}>
      <FaBell className="icono-campanita" onClick={toggleNotifications} />
      {showNotifications && (
        <div className="lista-notificaciones">
          {notificaciones.length > 0 ? (
            notificaciones.map((notificacion) => (
              <div key={notificacion.id} className="notificacion">
                <p className="mensaje">{notificacion.mensaje}</p>
                <small className="timestamp">{calcularTiempoTranscurrido(notificacion.timestamp)}</small>
              </div>
            ))
          ) : (
            <div className="no-notificaciones">No hay notificaciones</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notificaciones;