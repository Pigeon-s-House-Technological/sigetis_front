import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { BsTrashFill, BsPencilSquare } from 'react-icons/bs';
import axios from 'axios';
import './RegistrarGrupo.css'
import { API_BASE_URL } from '../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importar estilos de Toastify
import BotonAtras from '../General/BotonAtras';

const HomeGrupo = () => {
    const [grupos, setGrupos] = useState([]);
    const navigate = useNavigate();
    const { tipo } = useParams();

    const obtenerIdUser = async () => {
        return new Promise((resolve, reject) => {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            try {
              const parsedUser = JSON.parse(storedUser);
              
              console.log("id de usuario", parsedUser.userData.id);
              resolve(parsedUser.userData.id);
            } catch (error) {
              
              console.error('Error al parsear los datos del usuario:', error);
              reject(error);
            }
          } else {
            
            resolve(null);
          }
        });
      };
    
      useEffect(() => {
        const fetchData = async () => {
          const userId = await obtenerIdUser();
          try {
            let response;
            if (tipo !== '0' && userId !== null) {
              response = await axios.get(`${API_BASE_URL}/gruposPorTutor/${userId}`);
              setGrupos(response.data.grupos);
            } else {
              response = await axios.get(`${API_BASE_URL}/grupos`);
              setGrupos(response.data);
            }
          } catch (error) {
            console.error('Error al cargar los grupos:', error);
            toast.error('Error al cargar los grupos.');
          }
        };
    
        fetchData();
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
        navigate(`/editarGrupo/${id}/${tipo}`);
    };

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <BotonAtras direccion=''/>
            </div>
        <div className="home-grupo">
            <ToastContainer />
            <div className="header">
                <h2>Gestión de Grupos</h2>
                <div className='col col-button'>
                    <Button style={{ backgroundColor: '#007BFF' }} className="btn-custom-primary" onClick={handleClick}>Agregar Grupo</Button>
                </div>
            </div>
            {Array.isArray(grupos) && grupos.length > 0 ? (
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    
                        {grupos.map((grupo, index) => (
                            <tr key={grupo.id}>
                                <td>{index + 1}</td>
                                <td>{grupo.nombre_grupo}</td>
                                <td>{grupo.descripcion_grupo}</td>
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
            ):(
                <p>No hay grupos disponibles.</p>
            )}
                
        </div>
        </div>
    );
};


export default HomeGrupo;

