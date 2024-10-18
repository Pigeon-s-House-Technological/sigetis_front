import React, { useState } from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

import { API_BASE_URL } from '../config';


function RegistroDocente() {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
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
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formApellidos" className="mb-3">
          <Form.Label>Apellidos</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tus apellidos"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formCorreo" className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formUsuario" className="mb-3">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formContrasena" className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formConfirmarContrasena" className="mb-3">
          <Form.Label>Confirmar Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirma tu contraseña"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" style={{ backgroundColor: '#007bff', color: 'white', width: '100%' }}>
          Registrar
        </Button>
      </Form>
    </Container>
  );
}

export default RegistroDocente;