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
        console.log(response.data);
      } catch (error) {
        console.error('Error al obtener Usuario:', error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="homepage-container">
      <div className="seal">
        <h1>SIGETIS</h1>
        {data && data.userData ? (
          <p>Bienvenido {data.userData.nombre}</p>
        ) : (
          <p>No Autenticado</p>
        )}
        <p>Sistema de Gestión de Proyectos TIS</p>
      </div>
    </div>
  );
};

export default Homepage;