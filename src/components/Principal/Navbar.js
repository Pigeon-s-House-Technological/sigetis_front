import React from 'react';
import { NavLink } from 'react-router-dom';
import './Principal.css';
//estilos en app.css
const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
      <li>
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Inicio
          </NavLink>
        </li>
        {/*<li>
          <NavLink to="/equipos" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Equipos
          </NavLink>
        </li>
        */}
        <li>
          <NavLink to="/gestionarEvaluacion" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Evaluaciones
          </NavLink>
        </li>
        <li>
          <NavLink to="/historiaHU" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Historias de Usuario
          </NavLink>
        </li>
        <li>
          <NavLink to="/evaluacion" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Realizar Evaluacion
          </NavLink>
        </li>
        {/*<li>
          <NavLink to="/usuarios" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Usuarios
          </NavLink>
        </li>*/}
        <li>
          <button className="login-button" disabled>Iniciar sesión</button>
          <button className="register-button" disabled>Registrarse</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
