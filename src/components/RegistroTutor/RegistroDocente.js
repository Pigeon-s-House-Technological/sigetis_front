import React, { useState } from "react";

import { Button, Form, Container, Alert } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

import { API_BASE_URL } from '../config';

function RegistroDocente() {
  // Definir los estados que manejarán los datos del formulario
  const [nombre_user, setNombre] = useState('');
  const [apellido_user, setApellido] = useState('');
  const [correo, setCorreo] = useState('');

  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false); // Variable para mostrar mensaje de confirmación

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    
    // Validación de las contraseñas
    if (contrasena !== confirmarContrasena) {
      setError('Las contraseñas no coinciden');
      window.scrollTo(0, 0);
      return;
    }

    const data = {
      nombre: nombres,
      apellido: apellidos,
      correo: correo,
      usuario: usuario,
      tipo_usuario: 1,
      password: contrasena,
      password_confirmation: confirmarContrasena
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/register`, data);
      console.log('Registro exitoso:', response.data);
      setShowConfirmation(true); // Mostrar la alerta de confirmación
      setError(null);
      setTimeout(() => setRedirect(true), 2000);
      // Puedes redirigir al usuario o mostrar un mensaje de éxito aquí
    } catch (error) {
      console.error('Error al registrar el docente:', error.response ? error.response.data : error.message);
      setError('Correo o Usuario ya registrados');
  const [error, setError] = useState('');  
  const [exito, setExito] = useState(false);  

  // Función para guardar un nuevo estudiante
  const handleSave = async (e) => {
    e.preventDefault(); // 

    try {
      // Verificar que todos los campos estén llenos
      if (!nombre_user || !apellido_user || !correo) {
        setError('Todos los campos son requeridos'); // Mostrar mensaje de error si algún campo está vacío
        return;
      }

      // Datos que se enviarán al backend
      const data = {
        nombre_user: nombre_user,
        apellido_user: apellido_user,
        correo: correo,
        tipo_usuario: 3, 
      };

      console.log('Datos enviados:', data);
      
      
      const response = await axios.post(endPoint, data);

      // Si la solicitud es exitosa, mostrar mensaje de éxito y limpiar los campos
      setExito(true);
      setError('');  
      setNombre('');  
      setApellido('');  
      setCorreo('');  
    } catch (error) {
      console.error('Error al guardar el estudiante:', error.response ? error.response.data : error.message);
      
      // Mostrar mensaje de error detallado basado en la respuesta del servidor
      if (error.response) {
        setError(`Error al registrar el estudiante: ${error.response.data.message || error.response.data}`);
      } else {
        setError('Error al registrar el estudiante: No se pudo conectar con el servidor.');
      }
      setExito(false);
    }
    
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (

    <Container className="mt-5" style={{ maxWidth: '600px', backgroundColor: '#fafefe' }}>
      <h2 className="text-center" style={{ color: '#215f88' }}>Registro de Docentes/Tutores</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {showConfirmation && <Alert variant="success">Registro exitoso. Redirigiendo...</Alert>}
      <Form onSubmit={handleSubmit} style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '5px' }}>
        <Form.Group controlId="formNombres" className="mb-3">
          <Form.Label>Nombres</Form.Label>

    <div className="container mt-5" style={{ maxWidth: '500px', backgroundColor: '#F8F9FA', padding: '20px', borderRadius: '10px' }}>
      <h2 className="text-center" style={{ color: '#007BFF' }}>Registro de Docente/Tutor</h2>

      {/* Mostrar mensaje de error si existe */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Mostrar mensaje de éxito si el registro fue exitoso */}
      {exito && <p style={{ color: 'green' }}>Registro exitoso</p>}

      {/* Formulario para registrar el estudiante */}
      <Form onSubmit={handleSave}>
        <Form.Group className="mb-3" controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre"
            value={nombre_user}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formApellido">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu apellido"
            value={apellido_user}
            onChange={(e) => setApellido(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCorreo">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Registrar
        </Button>
      </Form>
    </div>
  );
}

export default RegistroDocente;
