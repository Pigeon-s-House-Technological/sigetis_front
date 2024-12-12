import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

import './ListaTutor.css';

const ListaTutor = () => {
    
  const [estudiantes, setEstudiantes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const responseTipo1 = await axios.get(`${API_BASE_URL}/usuariosTipo/1`);
        const estudiantesTipo1 = responseTipo1.data;
        setEstudiantes([...estudiantesTipo1]);
      } catch (error) {
        console.error('Error al obtener los estudiantes:', error);
      }
    };

    fetchEstudiantes();
  }, []);

  const editarClick = (id) => {
    // Lógica para editar un estudiante
  };

  const eliminarClick = (id) => {
    // Lógica para eliminar un estudiante
  };

  const handleAgregarEstudiante = () => {
    navigate('/registroDocente'); // Reemplaza '/ruta-deseada' con la ruta a la que deseas redireccionar
  };

  return (
    <div className='container'>
      <div className='row-home'>
        <h2 className='col col-h1'>Lista de Docentes</h2>
      </div>
      <div className='row-home'>
        <div className='col col-h3'>
          <h4>{estudiantes.length} Docentes</h4>
        </div>
        <div className='col col-button'>
          <Button style={{backgroundColor: '#007BFF'}} className="btn-custom-primary" onClick={handleAgregarEstudiante}>Agregar Docente</Button>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((estudiante, index) => (
            <tr key={estudiante.id}>
              <td>{index + 1}</td>
              <td>{estudiante.nombre}</td>
              <td>{estudiante.apellido}</td>
              <td>{estudiante.correo}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListaTutor;