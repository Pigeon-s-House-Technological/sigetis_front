import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaUser, FaEdit, FaUserTag } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function PerfilUsuario() {
  // Estados para almacenar datos dinámicos
  const [nombre_user, setNombre] = useState('');
  const [apellido_user, setApellido] = useState('');
  const [correo, setCorreo] = useState('');

  useEffect(() => {
    // Obtener los datos del usuario desde localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
  
      
      const userData = parsedUser.userData || {};
  
      // Asignar valores a los estados
      setNombre(userData.nombre || '');
      setApellido(userData.apellido || '');
      setCorreo(userData.correo || ''); 
    }
  }, []);

  return (
    <Card
      className="text-center mx-auto mt-5"
      style={{
        width: '350px',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div style={{ position: 'relative' }}>
        <FaUser style={{ fontSize: '80px', color: '#ccc' }} />
      </div>

      <Card.Body>
        <Card.Title style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
          {nombre_user} {apellido_user}
        </Card.Title>

        <Card.Text style={{ color: '#666' }}>
          {correo}
        </Card.Text>
      </Card.Body>

      <Card
        className="mx-4"
        style={{
          borderRadius: '10px',
          boxShadow: 'none',
          border: '1px solid #e6e6e6'
        }}
      >
        <Card.Body>
          {/* Opción: Editar perfil */}
          <Row className="text-start">
            <Col xs={2}>
              <FaEdit />
            </Col>
            <Col>
              <Link to="/editarPerfil" style={{ textDecoration: 'none', color: 'inherit' }}>
                Editar perfil
              </Link>
            </Col>
          </Row>
          <hr />
          {/* Opción: Rol */}
          <Row className="text-start">
            <Col xs={2}>
              <FaUserTag />
            </Col>
            <Col>
              Rol de usuario
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Card>
  );
}

export default PerfilUsuario;
