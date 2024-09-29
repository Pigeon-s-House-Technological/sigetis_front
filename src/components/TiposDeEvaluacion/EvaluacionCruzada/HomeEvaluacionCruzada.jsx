import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { BsTrashFill, BsPencilSquare } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import '../../../assets/css/Autoevaluacion.css'

const HomeEvaluacionCruzada = () => {
    const [autoevaluaciones, setAutoevaluaciones] = useState([])
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/evaluacionCruzada');
    };

    const eliminarClick = (id) => {
        setAutoevaluaciones(autoevaluaciones.filter(autoevaluacion => autoevaluacion.id !== id));
    };

    const editarClick = (id) => {
        const autoevaluacionEditar = autoevaluaciones.find(autoevaluacion => autoevaluacion.id === id);
        navigate('/editar', { state: autoevaluacionEditar });
    };

    // Ejemplo de evaluación (debería ser reemplazado por el almacenamiento real)
    const ejemplo = () => {
        setAutoevaluaciones([
            { id: 1, name: 'Evaluación 1' },
            { id: 2, name: 'Evaluación 2' },
            { id: 3, name: 'Evaluación 3' },
        ]);
    };

    return (
        <div className='HomeAutoevaluacion'>
            <div className='row-home'>
                <h2 className='col col-h1'>Evaluaciones Cruzadas</h2>
                <div className='col col-h3'>
                    <h2>{autoevaluaciones.length} Evaluaciones</h2>
                </div>
                <div className='col col-button'>
                    <Button variant="outline-primary" onClick={handleClick}>+ Añadir Evaluacion Cruzada</Button>
                </div>
            </div>
            <div className='table-autoevaluacion'>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Nro</th>
                            <th>Evaluaciones cruzadas</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {autoevaluaciones.map((autoevaluacion, index) => (
                            <tr key={autoevaluacion.id}>
                                <td>{index + 1}</td>
                                <td>{autoevaluacion.name}</td>
                                <td>
                                    <i onClick={() => editarClick(autoevaluacion.id)} style={{ cursor: 'pointer' }}>
                                        <BsPencilSquare />
                                    </i>
                                </td>
                                <td>
                                    <i onClick={() => eliminarClick(autoevaluacion.id)} style={{ cursor: 'pointer' }}>
                                        <BsTrashFill />
                                    </i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button onClick={ejemplo} variant="link">Cargar Evaluaciones de Ejemplo</Button>

            </div>
        </div>
    );
};

export default HomeEvaluacionCruzada;