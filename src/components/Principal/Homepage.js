import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Cookies from 'js-cookie';

import { API_BASE_URL } from '../config';
import './Principal.css'; // Asegúrate de crear este archivo para los estilos

const Homepage = () => {

  const [data, setData] = useState([]);

  

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('authToken');

      try {
        const response = await axios.get(`${API_BASE_URL}/user-profile`, {
          headers: {
            Authorization: `Bearer ${token}` // Enviar el token en el encabezado
          },
          withCredentials: true
        });
        setData(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log(response.data);
      } catch (error) {
        console.error('Error al obtener Usuario:', error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, []);

  const getTipoUsuario = (tipo) => {
    switch (tipo) {
      case 0:
        return 'Administrador';
      case 1:
        return 'Docente';
      case 2:
        return 'Jefe de Grupo';
      case 3:
        return 'Estudiante';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="homepage-container">
      <div className="seal">
        <h1>SIGETIS</h1>
        {data && data.userData ? (
        <>
          <p>Bienvenido {data.userData.nombre}</p>
          <p>Tipo de usuario: {getTipoUsuario(data.userData.tipo_usuario)}</p>
        </>
        ) : (
        <>
          <p>No Autenticado</p>
          <p>Inicia sesión para acceder a las funciones</p>
        </>
        )}
        <p>Sistema de Gestión de Proyectos TIS</p>
      </div>
    </div>
  );
};

export default Homepage;