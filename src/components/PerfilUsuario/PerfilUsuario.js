import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar'; // Importar react-avatar!!!!
import './PerfilUsuario.css';

function PerfilUsuario() {
  const [nombre_user, setNombre] = useState('');
  const [apellido_user, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const userData = parsedUser.userData || {};

      setNombre(userData.nombre || '');
      setApellido(userData.apellido || '');
      setCorreo(userData.correo || '');
      setTipoUsuario(userData.tipo_usuario || null); // Guardamos el tipo de usuario
    }
  }, []);

  const getAvatarColor = () => {
    // Asignar colores según el tipo de usuario
    if (tipoUsuario === 1) return '#28a745'; // Verde para docentes 
    if (tipoUsuario === 2 || tipoUsuario === 3) return '#007bff'; // Azul para estudiantes
    return '#6c757d'; // Gris para otros
  };

  return (
    <Card
      className="text-center mx-auto mt-5"
      style={{
        width: '350px',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ position: 'relative' }}>
        <Avatar
          name={`${nombre_user} ${apellido_user}`} 
          size="80" 
          round={true} 
          color={getAvatarColor()} // Color según el tipo de usuario
          className="avatar-no-hover" // Aplica la clase CSS
        />
      </div>

      <Card.Body>
        <Card.Title style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
          {nombre_user} {apellido_user}
        </Card.Title>

        <Card.Text style={{ color: '#666' }}>{correo}</Card.Text>
      </Card.Body>

      <Card
        className="mx-4"
        style={{
          borderRadius: '10px',
          boxShadow: 'none',
          border: '1px solid #e6e6e6',
        }}
      >
        <Card.Body>
          <Row className="text-start">
            <Col xs={2}>
              <span className="icon">🖊️</span>
            </Col>
            <Col>
              <Link to="/editarPerfil" style={{ textDecoration: 'none', color: 'inherit' }}>
                Editar perfil
              </Link>
            </Col>
          </Row>
          <hr />
          <Row className="text-start">
  <Col xs={2}>
    <span className="icon">📋</span>
  </Col>
  <Col>Rol</Col>
  <Col className="text-end" style={{ color: '#666' }}>
    {tipoUsuario === 0 && 'Administrador'}
    {tipoUsuario === 1 && 'Docente'}
    {tipoUsuario === 2 && 'Jefe de grupo'}
    {tipoUsuario === 3 && 'Estudiante'}
    {tipoUsuario === null && 'Administrador'}
  </Col>
</Row>

        </Card.Body>
      </Card>
    </Card>
  );
}

export default PerfilUsuario;
