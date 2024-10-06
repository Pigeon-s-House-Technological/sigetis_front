import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../config';

import RatingCircles from '../RatingCircles';

const PlanillaEvaluacion = () => {
    const { id } = useParams();
    return(id);
}

export default PlanillaEvaluacion;