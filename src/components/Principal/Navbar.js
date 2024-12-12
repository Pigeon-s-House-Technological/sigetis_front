import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import './Principal.css';
import Cookies from 'js-cookie';

import Notificaciones from './Notificaciones/Notificaciones';
import { FaUser } from 'react-icons/fa';


const Navbar = ({ userType }) => {  // Recibe 'userType' como prop
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [tipo, setTipo] = useState(10);
    const [grupo, setGrupo] = useState(null);

    useEffect(() => {
      console.log('Ejecutando useEffect de Navbar', userType);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser.userData);
          setTipo(parsedUser.userData.tipo_usuario);
          setGrupo(parsedUser.grupoId);
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
      <div className="navbar-left">
        <ul>
          <li className="navbar-brand">
            <Link to="/" className="navbar-brand">
              <span>SIGETIS</span>
            </Link>
          </li>
          {(tipo === 1) && (
            <>
              <li>
                <NavLink to="/homeGrupo" className={({ isActive }) => (isActive ? 'active-link' : '')}>
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
          {( tipo === 2 || tipo === 3) && (
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
              <li>
                <NavLink to={`/editarGrupo/${grupo}`} className={({ isActive }) => (isActive ? 'active-link' : '')}>
                  Grupo
                </NavLink>
              </li>
            </>
          )}
          {(tipo === 0) && (
            <>
              <li>
                <NavLink to="/ListaTutor" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                  Docente
                </NavLink>
              </li>
              <li>
                <NavLink to="/ListaEstudiante" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                  Estudiante
                </NavLink>
              </li>
              <li>
                <NavLink to="/homeGrupo" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                  Registrar Grupo
                </NavLink>
              </li>
              
            </>
          )}
        </ul>
      </div>

      <div className="navbar-right">
        <ul>
          <li>
            {isAuthenticated ? (
              <div className='navbar-actions'>
                
                <Notificaciones />
                <div className >
                <Link to="/perfil" className="profile-icon" title="Perfil">
                  <FaUser style={{ fontSize: '1.5rem', color: '#fff' }} />
                </Link>
                </div>
                <button onClick={logout} className="logout-button">Cerrar sesión</button>
              </div>
            ) : (
              <button onClick={handleClick} className="login-button">Iniciar sesión</button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
