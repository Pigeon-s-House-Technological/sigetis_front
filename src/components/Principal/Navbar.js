import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Principal.css';
//estilos en app.css
const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };
  return (
    <nav className="navbar">
      <ul>
      <li>
          <NavLink to="/" exact className={({ isActive }) => (isActive ? 'active-link' : '')}>
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
          <button onClick={handleClick} className="login-button" >Iniciar sesión</button>
          <button className="register-button" disabled>Registrarse</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
