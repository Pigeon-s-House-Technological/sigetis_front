import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { API_BASE_URL } from '../config'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Iconos para mostrar/ocultar contraseña

const endPoint = `${API_BASE_URL}/usuarios`; 

function RegistroEstudiante() {
  const [nombre_user, setNombre] = useState('');
  const [apellido_user, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [error, setError] = useState('');  
  const [exito, setExito] = useState(false);  
  const [usuario, setUsuario] = useState();  
  const [contrasena_usuario, setContrasena] = useState(''); 
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
 
  const [showPassword, setShowPassword] = useState(false); // Mostrar/ocultar contraseña
  const [validationStatus, setValidationStatus] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });

  // Función para validar la contraseña
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setValidationStatus({
      length: minLength,
      uppercase: hasUppercase,
      lowercase: hasLowercase,
      number: hasNumber,
      specialChar: hasSpecialChar
    });

    // Verificar si cumple con todos los requisitos
    if (!minLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
      //setError('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
      return false;
    }

    setError(null);
    return true;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setContrasena(newPassword);
    validatePassword(newPassword);
  };

  // Función para guardar un nuevo estudiante
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      if (!nombre_user || !apellido_user || !correo) {
        setError('Todos los campos son requeridos');
        return;
      }

      if (contrasena_usuario !== confirmarContrasena) {
        setError('Las contraseñas no coinciden');
        window.scrollTo(0, 0);
        return;
      }
  

      const data = {
        nombre_user,
        apellido_user,
        correo,
        tipo_usuario: 1, 
        contrasena_usuario, // Aquí enviamos la contraseña validada
        confirmarContrasena

      };

      console.log('Datos enviados:', data);
      const response = await axios.post(endPoint, data);

      setExito(true);
      setError('');
      setNombre('');
      setApellido('');
      setCorreo('');
      setContrasena('');
    } catch (error) {
      if (error.response) {
        setError(`Error al registrar el estudiante: ${error.response.data.message || error.response.data}`);
      } else {
        setError('Error al registrar el estudiante: No se pudo conectar con el servidor.');
      }
      setExito(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px', backgroundColor: '#F8F9FA', padding: '20px', borderRadius: '10px' }}>
      <h2 className="text-center" style={{ color: '#007BFF' }}>Registro de Docente/tutor</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {exito && <p style={{ color: 'green' }}>Registro exitoso</p>}

      <Form onSubmit={handleSave}>
        <Form.Group className="mb-3" controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre"
            value={nombre_user}
            onChange={(e) => {
              const regex = /^[a-zA-Z\s]*$/;
              if (regex.test(e.target.value)) {
                setNombre(e.target.value);
              }
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formApellido">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu apellido"
            value={apellido_user}
            onChange={(e) => {
              const regex = /^[a-zA-Z\s]*$/;
              if (regex.test(e.target.value)) {
                setApellido(e.target.value);
              }
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCorreo">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu correo electronico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            style={{ '::placeholder': { fontSize: '10px', color: '#999' } }}

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
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Ingresa tu contraseña"
              value={contrasena_usuario}
              onChange={handlePasswordChange}
            />
            {/* Cambiar el estilo del InputGroup.Text para que no parezca un botón */}
            <InputGroup.Text 
              onClick={() => setShowPassword(!showPassword)} 
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0 10px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>

          </InputGroup>

          {/* Criterios de validación */}
          <ul style={{ listStyleType: 'none', paddingLeft: '0', color: 'red' }}>
            <li style={{ color: validationStatus.length ? 'green' : 'red' }}>Al menos 8 caracteres</li>
            <li style={{ color: validationStatus.uppercase ? 'green' : 'red' }}>Al menos una letra mayúscula</li>
            <li style={{ color: validationStatus.lowercase ? 'green' : 'red' }}>Al menos una letra minúscula</li>
            <li style={{ color: validationStatus.number ? 'green' : 'red' }}>Al menos un número</li>
            <li style={{ color: validationStatus.specialChar ? 'green' : 'red' }}>Al menos un carácter especial (@, #, $, etc.)</li>
          </ul>

          {/* Mensaje de error si la contraseña no cumple con los requisitos */}
          {/*error && <p style={{ color: 'red' }}>{error}</p>*/}
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

        <Button variant="primary" type="submit" className="w-100">
          Registrar
        </Button>
      </Form>
    </div>
  );
}

export default RegistroEstudiante;
