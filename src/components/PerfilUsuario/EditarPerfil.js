import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function EditarPerfil() {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contrasenaActual, setContrasenaActual] = useState('');
  const [contrasenaNueva, setContrasenaNueva] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser).userData || {};
      setNombres(parsedUser.nombre || '');
      setApellidos(parsedUser.apellido || '');
      setCorreo(parsedUser.correo || '');
      setUsuario(parsedUser.usuario || '');
      setId(parsedUser.id || '');
    }
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!nombres || !apellidos || !correo || !usuario || !contrasenaActual) {
      setError('Todos los campos son requeridos, excepto la nueva contraseña.');
      return;
    }

    // Validar coincidencia de contraseñas nuevas solo si están llenadas
    if (contrasenaNueva || confirmarContrasena) {
      if (contrasenaNueva !== confirmarContrasena) {
        setError('Las contraseñas nuevas no coinciden.');
        return;
      }
    }

    try {
      const data = {
        nombre: nombres,
        apellido: apellidos,
        correo,
        usuario,
        current_password: contrasenaActual,
        ...(contrasenaNueva && { password: contrasenaNueva }), // Agregar contraseña nueva solo si se especificó
      };

      const response = await axios.patch(`${API_BASE_URL}/user-edit/${id}`, data);

      setExito(true);
      setError('');
      console.log('Perfil actualizado:', response.data);

      // Actualizar los datos en localStorage
      const updatedUser = { ...JSON.parse(localStorage.getItem('user')).userData, ...data };
      localStorage.setItem('user', JSON.stringify({ userData: updatedUser }));
    } catch (error) {
      if (error.response) {
        setError(`Error al actualizar el perfil: ${error.response.data.message || error.response.data}`);
      } else {
        setError('Error al actualizar el perfil: No se pudo conectar con el servidor.');
      }
      setExito(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px', backgroundColor: '#F8F9FA', padding: '20px', borderRadius: '10px' }}>
      <h2 className="text-center" style={{ color: '#007BFF' }}>Editar Perfil</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {exito && <p style={{ color: 'green' }}>¡Perfil actualizado exitosamente!</p>}

      <Form onSubmit={handleSave}>
        <Form.Group className="mb-3" controlId="formNombres">
          <Form.Label>
            Nombres <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tus nombres"
            value={nombres}
            maxLength={50}
            onChange={(e) => setNombres(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formApellidos">
          <Form.Label>
            Apellidos <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tus apellidos"
            value={apellidos}
            maxLength={50}
            onChange={(e) => setApellidos(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCorreo">
          <Form.Label>
            Correo Electrónico <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu correo"
            value={correo}
            maxLength={100}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUsuario">
          <Form.Label>
            Usuario <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu usuario"
            value={usuario}
            maxLength={50}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formContrasenaActual">
          <Form.Label>
            Contraseña Actual <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña actual"
            value={contrasenaActual}
            onChange={(e) => setContrasenaActual(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formContrasenaNueva">
          <Form.Label>Contraseña Nueva (opcional)</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Ingresa tu nueva contraseña (opcional)"
              value={contrasenaNueva}
              onChange={(e) => setContrasenaNueva(e.target.value)}
            />
            <InputGroup.Text
              onClick={() => setShowPassword(!showPassword)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmarContrasena">
          <Form.Label>Confirmar Nueva Contraseña (opcional)</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirma tu nueva contraseña (opcional)"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Guardar Cambios
        </Button>
      </Form>
    </div>
  );
}

export default EditarPerfil;
