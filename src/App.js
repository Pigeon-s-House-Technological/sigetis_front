
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Principal/Navbar.js';
import Footer from './components/Principal/Footer.js';
import Homepage from './components/Principal/Homepage.js';


import EvaluationCard from './components/EvaluationCard'; // Componente para la página inicial
import EvaluationForm from './components/EvaluationForm'; // Formulario de la evaluación
import ParesGrupal from './components/ParesGrupal';
import AutoevaluacionGrupal from './components/AutoevaluacionGrupal';
import CruzGrupal from './components/CruzGrupal';
import ParesIndividual from './components/ParesIndividual';
import AutoevaluacionIndividual from './components/AutoevaluacionIndividual';
import EvaluacionesPares from './components/EvaluacionesPares';
import EvaluationType from './components/EvaluationType';
import TiposDeEvaluacion from './components/TiposDeEvaluacion/TiposDeEvaluacion.jsx';
import Autoevaluacion from './components/TiposDeEvaluacion/Autoevaluacion/Autoevaluacion.jsx';
import EvaluacionCruzada from './components/TiposDeEvaluacion/EvaluacionCruzada/EvaluacionCruzada.jsx';
import EvaluacionEnPares from './components/TiposDeEvaluacion/EvaluacionEnPares/EvaluacionEnPares.jsx';
import HomeAutoevaluacion from './components/TiposDeEvaluacion/Autoevaluacion/HomeAutoevaluacion.jsx';
import HomeEvaluacionCruzada from './components/TiposDeEvaluacion/EvaluacionCruzada/HomeEvaluacionCruzada.jsx';
import HomeEvaluacionEnPares from './components/TiposDeEvaluacion/EvaluacionEnPares/HomeEvaluacionEnPares.jsx';
import HistoriaHU from './components/Gestion/HistoriaHU';
import DetalleHistoria from './components/Gestion/DetalleHistoria';
import CriteriosEvaluacion from './components/TiposDeEvaluacion/CriteriosEvaluacion';
import PreguntaEvaluation from './components/TiposDeEvaluacion/PreguntaEvaluation';



import './App.css';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className='content'>        
        <Routes>
          <Route path="/" element={<Homepage />} />


          {/* Ruta para "/evaluacion" que muestra EvaluationCard */}
          <Route path="/evaluacion" element={<EvaluationCard />} />
          {/* Ruta anidada "/evaluacion/formulario" para el formulario */}
          <Route path="/evaluacion/formulario" element={<EvaluationForm />} />
           {/* Ruta para Asignar tipo de evaluación */}
          <Route path="/tipoevaluacion" element={<EvaluationType />} />
           {/* Ruta para Asignar tipo de evaluación */}
          <Route path="/pares-grupal" element={<ParesGrupal />} />
          {/* Ruta para Asignar tipo de evaluación */}
          <Route path="/autoevaluacion-grupal" element={<AutoevaluacionGrupal />} />
          {/* Ruta para Asignar tipo de evaluación */}
          <Route path="/cruzada-grupal" element={<CruzGrupal />} />
          {/* Ruta para Asignar tipo de evaluación */}
          <Route path="/pares-individual" element={<ParesIndividual />} />
          {/* Ruta para Asignar tipo de evaluación */}
          <Route path="/autoevaluacion-individual" element={<AutoevaluacionIndividual />} />
        
          <Route path="/evaluacionespares" element={<EvaluacionesPares />} />
          <Route path="/historiaHU" element={<HistoriaHU />} />
          <Route path="/detalle/:id" element={<DetalleHistoria />} />

          <Route path="/gestionarEvaluacion" element={<TiposDeEvaluacion />} />
          <Route path="/homeAutoevaluacion" element={<HomeAutoevaluacion />} />
          <Route path="/gestionEvaluacion/:id" element={<CriteriosEvaluacion />} />
          <Route path="/autoevaluacion" element={<Autoevaluacion />} />
          <Route path="/evaluacionCruzada" element={<EvaluacionCruzada />} />
          <Route path="/homeEvaluacionCruzada" element={<HomeEvaluacionCruzada />} />
          <Route path="/evaluacionEnPares" element={<EvaluacionEnPares />} />
          <Route path="/homeEvaluacionEnPares" element={<HomeEvaluacionEnPares />} />
          <Route path="/criterio/:id" element={<PreguntaEvaluation />} />
        </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;