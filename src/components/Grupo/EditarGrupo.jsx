import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import './RegistrarGrupo.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditarGrupo = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        nombreGrupo: '',
        descripcion: '',
        cantidadInteg: '3',
    });

    const [grupoInfo, setGrupoInfo] = useState({
        docente: '',
        jefeDeGrupo: '',
        integrantes: [],
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGrupo = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/grupos/${id}`);
                const grupo = response.data.grupo;

                setInputs({
                    nombreGrupo: grupo.nombre_grupo,
                    descripcion: grupo.descripcion_grupo,
                    cantidadInteg: grupo.cantidad_integ,
                });

                setGrupoInfo({
                    docente: grupo.docente || 'No asignado',
                    jefeDeGrupo: grupo.jefeDeGrupo || 'No asignado',
                    integrantes: grupo.integrantes || [],
                });

                setLoading(false);
            } catch (error) {
                setLoading(false);
                toast.error('Error al cargar los datos del grupo.');
            }
        };

        fetchGrupo();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const user_tutor = localStorage.getItem('user');
            const user = JSON.parse(user_tutor);
            const id_tutor = user.userData.id;
            await axios.put(`${API_BASE_URL}/grupos/${id}`, {
                nombre_grupo: inputs.nombreGrupo,
                descripcion_grupo: inputs.descripcion,
                cantidad_integ: inputs.cantidadInteg,
                id_tutor: id_tutor, // ID de tutor
                id_jefe_grupo: 1 // ID de jefe de grupo
            });

            toast.success('¡Cambios guardados exitosamente!');
            navigate('/homeGrupo');
        } catch (error) {
            toast.error('Error al guardar los cambios.');
        }
    };

    if (loading) {
        return <p>Cargando datos del grupo...</p>;
    }

    return (
        <div className="container-grupo">
            <ToastContainer />
            <div className="container migrupo">
                <h2>Mi Grupo</h2>
                <label htmlFor="nombreGrupo">Nombre:</label>
                <p>{inputs.nombreGrupo}</p>
                <label htmlFor="descripcion">Descripción:</label>
                <p>{inputs.descripcion}</p>
                <label htmlFor="docente">Docente:</label>
                <p>{grupoInfo.docente}</p>
                <label htmlFor="jefe-de-grupo">Líder de grupo:</label>
                <p>{grupoInfo.jefeDeGrupo}</p>
                <label htmlFor="integrantes">Integrantes:</label>
                <ul>
                    {grupoInfo.integrantes.length > 0 ? (
                        grupoInfo.integrantes.map((integrante, index) => (
                            <li key={index}>{integrante}</li>
                        ))
                    ) : (
                        <p>No hay integrantes registrados.</p>
                    )}
                </ul>
            </div>

            <div className="container editar">
                <h2>Datos del Grupo</h2>
                <form className="group-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombreGrupo">Nombre de grupo:</label>
                        <input
                            type="text"
                            name="nombreGrupo"
                            value={inputs.nombreGrupo}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="descripcion">Descripción:</label>
                        <input
                            type="text"
                            name="descripcion"
                            value={inputs.descripcion}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cantidadInteg">Cantidad de integrantes:</label>
                        <select
                            id="cantidadInteg"
                            name="cantidadInteg"
                            value={inputs.cantidadInteg}
                            onChange={handleChange}
                        >
                            {[3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="submit-button">
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditarGrupo;


