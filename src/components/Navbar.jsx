// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Navbar.css';  // Importamos el archivo CSS para los estilos

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">MiLogo</Link>
            </div>Inicio
            <ul className="navbar-links">
                <li>
                    <Link to="/"></Link>
                </li>
                <li>
                    <Link to="/tiposDeEvaluacion">Tipos de evaluacion</Link>
                </li>
                <li>
                    <Link to="/iniciar-seccion">Iniciar Seccion</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
