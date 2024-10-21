import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import './Principal.css';
import Cookies from 'js-cookie';

const Navbar = ({ userType }) => {  // Recibe 'userType' como prop
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
    useEffect(() => {
        const token = Cookies.get('authToken');
        setIsAuthenticated(!!token); // Si el token existe, el usuario está autenticado
    }, []);

const handleClick = () => {
    navigate('/login');
  };

  const logout =async () => {
    const token = Cookies.get('authToken');
    Cookies.remove('authToken'); // Eliminar el token de las cookies
    localStorage.removeItem('user'); // Eliminar el usuario del almacenamiento local
    window.location.reload();
    setIsAuthenticated(false); // Actualizar el estado de autenticación
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    if (selectedValue === 'registrarGrupo') {
      navigate('/registrarGrupo');
    } else if (selectedValue === 'verGrupos') {
      navigate('/verGrupos');
    }
  };
    return (
        <nav className={`navbar ${userType}`}> {/* Aplicamos clase dinámica */}
            <ul>
      <li className="navbar-brand">
        <Link to="/" className="navbar-brand">
          <span>SIGETIS</span>
        </Link>
        </li>
        <li>
          <NavLink to="/gestionarEvaluacion" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Evaluaciones
          </NavLink>
        </li>
        <li>
          <NavLink to="/registrarGrupo" className={({ isActive}) => (isActive ? 'active-link' : '')}>
            Registrar Grupo
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
        <li>
          <NavLink to="/planilla" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Planilla de Evaluacion
          </NavLink>
        </li>
        <li>
          <NavLink to="/asignarEvaluacion" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Asignar
          </NavLink>
        </li>
        <li>
          {isAuthenticated ? (
            <button onClick={logout} className="logout-button">Cerrar sesión</button>
          ) : (
            <button onClick={handleClick} className="login-button">Iniciar sesión</button>
          )}
        </li>
      </ul>
        </nav>
    );
};

export default Navbar;
