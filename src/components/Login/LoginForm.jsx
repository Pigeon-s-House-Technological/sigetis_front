import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

import { API_BASE_URL } from '../config';
import './Style/Login.css';

const LoginForm = ({ userType }) => {

    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false); // Variable para mostrar mensaje de confirmación


    const handleSubmit = async (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);

        const data = {
            usuario: usuario,
            password: contrasena
        }
        
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, data, { withCredentials: true });
            console.log('Inicio de sesion exitoso:', data.usuario);
            const token = response.data.token;

            // Guardar el token en una cookie
            Cookies.set('authToken', token, { expires: 7 });
            setShowConfirmation(true); // Mostrar la alerta de confirmación
            setError(null);    
            setTimeout(() => window.location.reload(), 1000);
            setTimeout(() => setRedirect(true));
          } catch (error) {
            console.error('Error al iniciar sesion:', error.response ? error.response.data : error.message);
            setError('Usuario o contraseña incorrectos');
          }
    };

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {showConfirmation && <p style={{ color: 'green' }}>Inicio de sesión exitoso. Redirigiendo...</p>}
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="user">Usuario</label>
            <input
                type="text"
                id="user"
                name="user" // Usar name para manejar el cambio
                placeholder="Ingrese el usuario"
                onChange={e => setUsuario(e.target.value)}
                required
            />
            <label htmlFor="password">Contraseña</label>
            <input
                type="password"
                id="password"
                name="password" // Usar name para manejar el cambio
                placeholder="Ingrese la contraseña"
                onChange={e => setContrasena(e.target.value)}
                required
            />
            <button type="submit" className="submit-button">
                Iniciar Sesión
            </button>
        </form>
        </div>
    );
};

export default LoginForm;
