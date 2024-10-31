import React from 'react';
import LoginForm from './LoginForm';
import './Style/Login.css';

const LoginModal = ({ userType, toggleUserType }) => {
    return (
        <div className={`login-container ${userType}`}>
            <h2 className="title">Iniciar Sesión</h2>

            {/*<div className="toggle-buttons">
                <button
                    className={`toggle-button ${userType === 'student' ? 'active' : ''}`}
                    onClick={() => toggleUserType('student')}
                >
                    Estudiante
                </button>
                <button
                    className={`toggle-button ${userType === 'teacher' ? 'active' : ''}`}
                    onClick={() => toggleUserType('teacher')}
                >
                    Docente/Tutor
                </button>
            </div>**/}

            <div className="form-container">
                <LoginForm userType={userType} />
            </div>
        </div>
    );
};

export default LoginModal;
