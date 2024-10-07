import React, { useState } from 'react';
import './Style/Login.css';

const LoginForm = ({ userType }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Iniciando sesión como ${userType}:`, credentials);
        // Aquí puedes agregar la lógica de autenticación
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Usuario</label>
            <input
                type="text"
                id="email"
                name="email" // Usar name para manejar el cambio
                placeholder="Ingrese el usuario"
                value={credentials.email}
                onChange={handleChange}
                required
            />
            <label htmlFor="password">Contraseña</label>
            <input
                type="password"
                id="password"
                name="password" // Usar name para manejar el cambio
                placeholder="Ingrese la contraseña"
                value={credentials.password}
                onChange={handleChange}
                required
            />
            <button type="submit" className="submit-button">
                Iniciar Sesión
            </button>
        </form>
    );
};

export default LoginForm;
