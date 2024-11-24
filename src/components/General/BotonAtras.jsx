import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import './general.css'; // Asegúrate de importar el archivo CSS si tienes estilos adicionales

const BotonAtras = ({direccion="no"}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if(direccion==="no"){
      navigate(-1); // Navega a la página anterior en el historial
    }else{
      console.log('navegando a:', direccion);
      navigate(`/${direccion}`, { replace: true });
    }
  };

  return (
    <Button onClick={handleBack} className='boton-atras'>
      <FaArrowLeft />
    </Button>
  );
};

export default BotonAtras;