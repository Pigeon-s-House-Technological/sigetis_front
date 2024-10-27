import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import './Principal.css';
import Cookies from 'js-cookie';

const Navbar = ({ userType }) => {  // Recibe 'userType' como prop
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [tipo, setTipo] = useState(10);

    useEffect(() => {
      console.log('Ejecutando useEffect de Navbar', userType);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser.userData);
          setTipo(parsedUser.userData.tipo_usuario);
          console.log(parsedUser.userData.tipo_usuario);
        } catch (error) {
          setUser(null);
          console.error('Error al parsear los datos del usuario:', error); 
        }
      }
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

  return (
    <nav className={`navbar ${userType}`}> {/* Aplicamos clase dinámica */}
      <ul>
      <li className="navbar-brand">
        <Link to="/" className="navbar-brand">
          <span>SIGETIS</span>
        </Link>
        </li>
        {(tipo === 0 || tipo === 1) && (
          <>
            <li>
              <NavLink to="/registrarGrupo" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Registrar Grupo
              </NavLink>
            </li>
            <li>
              <NavLink to="/gestionarEvaluacion" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Evaluaciones
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
            
          </>
        )}
        {(tipo === 0 || tipo === 2 || tipo === 3) && (
          <>
            <li>
              <NavLink to="/sprints" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Sprints
              </NavLink>
            </li>
            <li>
              <NavLink to="/evaluacion" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Realizar Evaluacion
              </NavLink>
            </li>
          </>
        )}
        {(tipo === 0) && (
          <>
          <li>
              <NavLink to="/registroDocente" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Registrar Docente
              </NavLink>
            </li>
          </>  
        )}
        
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
