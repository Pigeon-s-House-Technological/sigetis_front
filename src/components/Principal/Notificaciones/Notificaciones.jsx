import React, { useState, useEffect, useRef } from 'react';
import { FaBell } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Notificaciones.css'; // Importa el archivo CSS para los estilos
import { API_BASE_URL } from '../../config';

const Notificaciones = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);

  const notificacionesRef = useRef(null);
  const [usuario, setUsuario] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerId = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUsuario(user.userData.id);
      } else {
        console.error('Usuario no autenticado');
      }
    };

    obtenerId();
  }, []);

  
  const fetchNotificaciones = async () => {
    if (usuario) {
      try {
        const response = await axios.get(`${API_BASE_URL}/notificaciones/usuario/${usuario}`);
        if (response.data && response.data.notificaciones) {
          const notificacionesData = response.data.notificaciones.map((notificacion) => {
            const data = JSON.parse(notificacion.data);
            let mensaje = '';
            switch (data.accion) {
              case 'crear':
                mensaje = `El usuario ${data.nombre_creador} del grupo ${data.nombre_grupo} ha creado una nueva tarea`;
                break;
              case 'editar':
                mensaje = `El usuario ${data.nombre_creador} del grupo ${data.nombre_grupo} ha editado una tarea`;
                break;
              case 'eliminar':
                mensaje = `El usuario ${data.nombre_creador} del grupo ${data.nombre_grupo} ha eliminado una tarea`;
                break;
              default:
                mensaje = `El usuario ${data.nombre_creador} del grupo ${data.nombre_grupo} ha realizado una acción`;
                break;
            }
            return {
              id: notificacion.id, // Usa el UUID como clave única
              mensaje: mensaje,
              timestamp: new Date(notificacion.created_at),
              data: data,
              type:notificacion.type,
            };
          });
          notificacionesData.sort((a, b) => b.timestamp - a.timestamp);
          console.log('notificacionesData', notificacionesData);
          setNotificaciones(notificacionesData);
        } else {
          console.error('Respuesta de la API no válida', response.data);
        }
      } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
      }
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      fetchNotificaciones();
    }
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

  const handleNotificationClick = (tipo, id) => {
    console.log('tipo', tipo);
    console.log('id', id);
    let link = '';
    if (tipo === 'App\\Notifications\\TareaNotification') {
      link = '/resultados/' + id;
    }
    setShowNotifications(false);
    navigate(link);
  };

  return (
    <div className="notificaciones" ref={notificacionesRef}>
      <FaBell className="icono-campanita" onClick={toggleNotifications} />
      {showNotifications && (
        <div className="lista-notificaciones">
          <h4>Notificaciones</h4>
          {notificaciones.length > 0 ? (
            notificaciones.map((notificacion) => (
              <div key={notificacion.id} className="notificacion" onClick={() => handleNotificationClick(notificacion.type, notificacion.data.actividad_id)}>
                <p className="mensaje" data-full-message={notificacion.mensaje}>{notificacion.mensaje}</p>
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