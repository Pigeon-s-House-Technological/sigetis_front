
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
import { HistoriaHU, DetalleHistoria } from './components/Gestion';
import { LoginForm, LoginModal } from './components/Login';
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
          <Route path="/loginForm" element={<LoginForm />} />

          {/* Ruta para "/evaluacion" que muestra EvaluationCard */}
          <Route path="/evaluacion" element={<EvaluationCard />} />
          {/* Ruta anidada "/evaluacion/formulario" para el formulario */}
          <Route path="/evaluacion/formulario" element={<EvaluationForm />} />
          <Route path="/asignarEvaluacion" element={<EvaluationType />} />
          <Route path="/asignarEvaluacion/:destinatario/:tipo" element={<Asignar />} />
          
          <Route path="/historiaHU" element={<HistoriaHU />} />
          <Route path="/detalle/:id" element={<DetalleHistoria />} />
          <Route path="/registroDocente" element={<Registro />} />

          <Route path="/gestionarEvaluacion" element={<TiposDeEvaluacion />} />
          <Route path="/homeAutoevaluacion" element={<HomeAutoevaluacion />} />
          <Route path="/gestionEvaluacion/:id" element={<CriteriosEvaluacion />} />
          <Route path="/homeEvaluacionCruzada" element={<HomeEvaluacionCruzada />} />
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