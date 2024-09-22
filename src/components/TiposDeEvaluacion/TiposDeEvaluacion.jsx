import React from 'react';
import { Link } from 'react-router-dom';
import './Evaluaciones.css';
import Card from 'react-bootstrap/Card';
import autoevaluacion from '../../assets/img/autoevaluacion.png'
import evaluacionCruzada from '../../assets/img/evaluacionCruzada.png'
import evaluacionEnPares from '../../assets/img/evaluacionEnPares.png'

const TiposDeEvaluacion = () => {
    return (
        <div className="container tipos-de-evaluacion">
            <div className="titulo">
                <h1>Evaluaciones</h1>
            </div>
            <div className="evaluaciones-grid">
                <Link to="/autoevaluacion" style={{ textDecoration: 'none' }}>
                    <Card className="evaluacion-card">
                        <Card.Img variant="top" src={autoevaluacion} />
                        <Card.Body>
                            <Card.Title>Autoevaluación</Card.Title>
                            <Card.Subtitle>Descripción:</Card.Subtitle>
                            <Card.Text>
                                Evaluación que permite a los equipos de trabajo y a sus integrantes realizar una retroalimentación sobre su trabajo.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
                <Link to="/evaluacionCruzada" style={{ textDecoration: 'none' }}>
                    <Card className="evaluacion-card">
                        <Card.Img variant="top" src={evaluacionCruzada} />
                        <Card.Body>
                            <Card.Title>Evaluación Cruzada</Card.Title>
                            <Card.Subtitle>Descripción:</Card.Subtitle>
                            <Card.Text>
                                Evaluación que permite a los equipos de trabajo evaluar el trabajo de otros equipos.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
                <Link to="/autoevaluacion" style={{ textDecoration: 'none' }}>
                    <Card className="evaluacion-card">
                        <Card.Img variant="top" src={evaluacionEnPares} />
                        <Card.Body>
                            <Card.Title>Evaluación en Pares</Card.Title>
                            <Card.Subtitle>Descripción:</Card.Subtitle>
                            <Card.Text>
                                Permite a los integrantes de un equipo evaluar el desempeño de sus compañeros de equipo.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            </div>
        </div>
    );
};

export default TiposDeEvaluacion;
