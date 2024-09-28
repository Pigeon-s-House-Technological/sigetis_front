import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>Inicio</li>
        <li>Equipos</li>
        <li>Evaluaciones</li>
        <li>Criterios</li>
        <li>Reportes</li>
        <li>Usuarios</li>
        <li>
          <button className="login-button">Iniciar sesión</button>
          <button className="register-button">Registrarse</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
