import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import './Principal.css';
import Cookies from 'js-cookie';

const Navbar = ({ userType }) => {  // Recibe 'userType' como prop
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('authToken');
        setIsAuthenticated(!!token); // Si el token existe, el usuario está autenticado
    }, []);

    const handleClick = () => {
        navigate('/login');
    };

    const logout = async () => {
        Cookies.remove('authToken'); // Eliminar el token de las cookies
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
                <li>
                    <NavLink to="/" end className={({ isActive }) => (isActive ? 'active-link' : '')}>
                        Inicio
                    </NavLink>
                </li>
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
                        Realizar Evaluación
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
