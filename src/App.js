
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Principal/Navbar.js';
import Footer from './components/Principal/Footer.js';
import Homepage from './components/Principal/Homepage.js';
import './App.css';
//importaciones de componentes de sus respectivos indices (para optimizar espacio)
import { EvaluationCard, EvaluationForm } from './components/RealizarEvaluacion';
import { EvaluationType, Asignar } from './components/AsignarEvaluacion';
import { TiposDeEvaluacion, HomeAutoevaluacion, HomeEvaluacionCruzada, 
          HomeEvaluacionEnPares, CriteriosEvaluacion, PreguntaEvaluation } from './components/TiposDeEvaluacion';
import { HistoriaHU, DetalleHistoria } from './components/GestionTareas/index.js';
import { PlanillaEvaluacion, PlanillaEvaluacionActividades, PlanillaEvaluacionEvaluaciones } from './components/PlanillaEvaluacion';
import { RegistroDocente } from './components/RegistroTutor';
import {  LoginModal } from './components/Login';
import RegistrarGrupo from './components/Grupo/RegistrarGrupo.jsx'
import RegistroEstudiante from './components/RegistroEstudiante/RegistroEstudiante.js';

//Fin importaciones de componentes de sus respectivos indices (para optimizar espacio)

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className='content'>        
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginModal />} />

          {/* Ruta para "/evaluacion" que muestra EvaluationCard */}
          <Route path="/evaluacion" element={<EvaluationCard />} />
          {/* Ruta anidada "/evaluacion/formulario" para el formulario */}
          <Route path="/evaluacion/formulario" element={<EvaluationForm />} />
          <Route path="/asignarEvaluacion" element={<EvaluationType />} />
          <Route path="/asignarEvaluacion/:destinatario/:tipo" element={<Asignar />} />

          {/*Ruta de prueba para registro de grupo http://localhost:3000/registrarGrupo*/}
          <Route path="/registrarGrupo" element={<RegistrarGrupo />} />
          
          <Route path="/historiaHU" element={<HistoriaHU />} />
          <Route path="/detalle/:id" element={<DetalleHistoria />} />

          <Route path="/registroDocente" element={<RegistroDocente />} />
          <Route path="/registroEstudiante" element={<RegistroEstudiante />} />

          <Route path="/gestionarEvaluacion" element={<TiposDeEvaluacion />} />
          <Route path="/homeAutoevaluacion" element={<HomeAutoevaluacion />} />
          <Route path="/gestionEvaluacion/:id" element={<CriteriosEvaluacion />} />
          <Route path="/homeEvaluacionCruzada" element={<HomeEvaluacionCruzada />} />
          <Route path="/homeEvaluacionEnPares" element={<HomeEvaluacionEnPares />} />
          <Route path="/criterio/:id" element={<PreguntaEvaluation />} />

          <Route path="/planilla" element={<PlanillaEvaluacion />} />
          <Route path="/planilla/actividades/:idGrupo" element={<PlanillaEvaluacionActividades />} />
          <Route path="/planilla/evaluaciones/:idGrupo" element={<PlanillaEvaluacionEvaluaciones />} />
        </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
