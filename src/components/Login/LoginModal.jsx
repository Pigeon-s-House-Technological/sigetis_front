import React, { useState } from 'react';
import LoginForm from './LoginForm';
import './Style/Login.css';

const LoginModal = () => {
    const [userType, setUserType] = useState('student'); // Mostrar Docente por defecto
    

    const toggleUserType = (type) => {
        setUserType(type);
    };

    return (
        <div className="login-container">
            <h2 className="title">Iniciar Sesión</h2>

            <div className="toggle-buttons">
                <button
                    className={`toggle-button ${userType === 'student' ? 'active' : ''}`}
                    onClick={() => toggleUserType('student')}>
                    Estudiante
                </button>
                <button
                    className={`toggle-button ${userType === 'teacher' ? 'active' : ''}`}
                    onClick={() => toggleUserType('teacher')}>
                    Docente/Tutor
                </button>
            </div>

            <div className="form-container">
                <LoginForm userType={userType} />
            </div>
        </div>
    );
};

export default LoginModal;


