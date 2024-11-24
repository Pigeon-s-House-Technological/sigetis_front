import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BsTrashFill, BsPencilSquare } from 'react-icons/bs';
import axios from 'axios';
import './RegistrarGrupo.css'
import { API_BASE_URL } from '../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importar estilos de Toastify

const HomeGrupo = () => {
    const [grupos, setGrupos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGrupos = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/grupos`);

                if (response.status === 200) {
                    setGrupos(response.data);
                }
            } catch (error) {
                console.error('Error al cargar los grupos:', error);
                toast.error('Error al cargar los grupos.');
            }
        };
        fetchGrupos();
    }, []);

    const eliminarClick = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/grupos/${id}`);
            setGrupos((prevGrupos) => prevGrupos.filter((grupo) => grupo.id !== id));
            toast.success('¡Grupo eliminado exitosamente!');
        } catch (error) {
            console.error('Error al eliminar el grupo:', error);
            toast.error('Hubo un error al eliminar el grupo.');
        }
    };

    const handleClick = () => {
        navigate('/registrarGrupo');
    };

    const editarClick = (id) => {
        navigate(`/editarGrupo/${id}`);
    };

    return (
        <div className="home-grupo">
            <ToastContainer />
            <div className="header">
                <h2>Gestión de Grupos</h2>
                <div className='col col-button'>
                    <Button style={{ backgroundColor: '#007BFF' }} className="btn-custom-primary" onClick={handleClick}>Agregar Grupo</Button>
                </div>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Integrantes</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {grupos.map((grupo, index) => (
                        <tr key={grupo.id}>
                            <td>{index + 1}</td>
                            <td>{grupo.nombre_grupo}</td>
                            <td>{grupo.descripcion_grupo}</td>
                            <td>{grupo.cantidad_integ}</td>
                            <td>
                                <Button style={{ backgroundColor: '#09DDCC', color: 'black' }} className="btn-custom-warning" onClick={() => editarClick(grupo.id)}>
                                    <BsPencilSquare />
                                </Button>
                                {' '}
                                <Button style={{ backgroundColor: 'red' }} className="btn-custom-danger" onClick={() => eliminarClick(grupo.id)}>
                                    <BsTrashFill />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};


export default HomeGrupo;

