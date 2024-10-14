import { useState } from 'react';
import './RegistrarGrupo.css';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const GroupForm = ({ onClose }) => {
    const [inputs, setInputs] = useState({
        nombreGrupo: '',
        descripcion: '',
        cantidadInteg: '2',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    };

    const validate = () => {
        let tempErrors = {};
        if (!inputs.nombreGrupo) tempErrors.nombreGrupo = 'El nombre del grupo es requerido';
        if (!inputs.descripcion) tempErrors.descripcion = 'La descripción del grupo es requerida';
        return tempErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post(`${API_BASE_URL}/grupos`, {
                    nombre_grupo: inputs.nombreGrupo,
                    descripcion_grupo: inputs.descripcion,
                    cantidad_integ: inputs.cantidadInteg,
                    id_tutor: 1, // ID de tutor (se puede manejar dinámicamente)
                    id_jefe_grupo: 1 // ID de jefe de grupo (se puede manejar dinámicamente)
                });
                if (response.status === 201) {
                    setSuccessMessage('Grupo registrado exitosamente');
                    setInputs({ nombreGrupo: '', descripcion: '', cantidadInteg: '2' }); // Limpiar el formulario
                }
            } catch (error) {
                console.error('Error al registrar el grupo:', error);
                setErrors({ apiError: 'Hubo un error al registrar el grupo.' });
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="container-group">
            <div className="form-header">
                <IoMdClose className="close-icon" onClick={onClose} />
            </div>
            <h2 className="title">Registro de Grupos</h2>
            <form className="group-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombreGrupo">Nombre de grupo:</label>
                    <input
                        type="text"
                        name="nombreGrupo"
                        value={inputs.nombreGrupo}
                        onChange={handleChange}
                        className={errors.nombreGrupo ? 'error' : ''}
                    />
                    {errors.nombreGrupo && <span className="error-message">{errors.nombreGrupo}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="descripcion">Descripción de grupo:</label>
                    <input
                        type="text"
                        name="descripcion"
                        value={inputs.descripcion}
                        onChange={handleChange}
                        className={errors.descripcion ? 'error' : ''}
                    />
                    {errors.descripcion && <span className="error-message">{errors.descripcion}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="cantidadInteg">Cantidad de integrantes:</label>
                    <select
                        id="cantidadInteg"
                        name="cantidadInteg"
                        value={inputs.cantidadInteg}
                        onChange={handleChange}
                    >
                        {[3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>

                {successMessage && <span className="success-message">{successMessage}</span>}
                {errors.apiError && <span className="error-message">{errors.apiError}</span>}

                <button type="submit" className="submit-button">
                    Registrar Equipo
                </button>
            </form>
        </div>
    );
};

export default GroupForm;
