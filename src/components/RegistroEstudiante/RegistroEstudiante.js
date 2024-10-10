import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';

function RegistroEstudiante() {
  // Definición de variables de estado
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  // Función para manejar el envío del formulario (solo maneja los datos localmente)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulamos una acción de registro mostrando los datos en consola
    const datosEstudiante = {
      nombres,
      apellidos,
      correoElectronico,
      usuario,
      contrasena,
    };

    console.log('Datos del estudiante registrados:', datosEstudiante);

    // Después de simular el registro, limpiamos los campos
    setNombres('');
    setApellidos('');
    setCorreoElectronico('');
    setUsuario('');
    setContrasena('');
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px', backgroundColor: '#F8F9FA', padding: '20px', borderRadius: '10px' }}>
      <h2 className="text-center" style={{ color: '#007BFF' }}>Registro de Estudiante</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formNombres">
          <Form.Label>Nombres</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formApellidos">
          <Form.Label>Apellidos</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tus apellidos"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCorreoElectronico">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu correo electrónico"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUsuario">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formContrasena">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Registrar
        </Button>
      </Form>
    </div>
  );
}

export default RegistroEstudiante;