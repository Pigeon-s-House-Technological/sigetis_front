import { useState } from 'react';
import './RegistrarGrupo.css';
import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import ModalUsuarios from './ModalUsuarios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GroupForm = ({ onClose }) => {
    const [inputs, setInputs] = useState({
        nombreGrupo: '',
        descripcion: '',
        cantidadInteg: '3',
    });

    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [usuarios, setUsuarios] = useState([]);

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
        if (!inputs.cantidadInteg) tempErrors.cantidadInteg = 'La cantidad de integrantes es requerida';
        return tempErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            try {
                const user_tutor = localStorage.getItem('user');
                const user = JSON.parse(user_tutor);
                const id_tutor = user.userData.id;
                const response = await axios.post(`${API_BASE_URL}/grupos`, {
                    nombre_grupo: inputs.nombreGrupo,
                    descripcion_grupo: inputs.descripcion,
                    cantidad_integ: inputs.cantidadInteg,
                    id_tutor: id_tutor, // ID de tutor
                    id_jefe_grupo: 1 // ID de jefe de grupo
                });

                if (response.status === 201) {
                    const idGrupo = response.data.message.id;
                    const response2 = await axios.get(`${API_BASE_URL}/crearGrupo/${inputs.cantidadInteg}/${idGrupo}`);
                    setUsuarios(response2.data.usuarios);
                    setInputs({ nombreGrupo: '', descripcion: '', cantidadInteg: '' });
                    toast.success('¡Grupo registrado exitosamente!');
                    handleOpenModal();
                }
            } catch (error) {
                console.error('Error al registrar el grupo:', error);
                setErrors({ apiError: 'Hubo un error al registrar el grupo.' });
                toast.error('Hubo un error al registrar el grupo.');
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="container">
        <div className="container-group">
            <ToastContainer /> 
            <div className="form-header">
                <Link to="/homeGrupo">
                    <IoMdClose className="close-icon" />
                </Link>
            </div>
            <h2 className="title">Registro de Grupos</h2>
            <form className="group-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombreGrupo">Nombre de grupo:</label>
                    <input
                        type="text"
                        name="nombreGrupo"
                        placeholder="Ingrese el nombre del grupo"
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
                        placeholder="Ingrese la descripción"
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

                {errors.apiError && <span className="error-message">{errors.apiError}</span>}

                <button type="submit" className="submit-button">
                    Registrar Grupo
                </button>
            </form>

            <ModalUsuarios
                show={showModal}
                handleClose={handleCloseModal}
                usuarios={usuarios}
            />
        </div>
        </div>
    );
};

export default GroupForm;
