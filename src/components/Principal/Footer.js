import React from 'react';
import './Principal.css';

const Footer = ({ userType }) => {  // Recibe 'userType' como prop
    return (
        <footer className={`footer ${userType}`}> {/* Aplicamos clase dinámica */}
            <div className="contact-info">
                <p>Contactanos: (+591) 65028458</p>
                <p>Email: sigetis.umss@gmail.com</p>
            </div>
            <div className="links">
                <a href="https://cs.umss.edu.bo">cs.umss.edu.bo</a>
                <a href="https://fcyt.umss.edu.bo">fcyt.umss.edu.bo</a>
                <a href="https://umss.edu.bo">umss.edu.bo</a>
                <a href="https://umss.edu.bo">Como usar</a>
            </div>
            <p>&copy; Pigeon's House Technological</p>
        </footer>
    );
};

export default Footer;
