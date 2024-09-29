// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TiposDeEvaluacion from './components/TiposDeEvaluacion/TiposDeEvaluacion.jsx';
import Autoevaluacion from './components/TiposDeEvaluacion/Autoevaluacion/Autoevaluacion.jsx';
import EvaluacionCruzada from './components/TiposDeEvaluacion/EvaluacionCruzada/EvaluacionCruzada.jsx';
import EvaluacionEnPares from './components/TiposDeEvaluacion/EvaluacionEnPares/EvaluacionEnPares.jsx';
import HomeAutoevaluacion from './components/TiposDeEvaluacion/Autoevaluacion/HomeAutoevaluacion.jsx';
import HomeEvaluacionCruzada from './components/TiposDeEvaluacion/EvaluacionCruzada/HomeEvaluacionCruzada.jsx';
import HomeEvaluacionEnPares from './components/TiposDeEvaluacion/EvaluacionEnPares/HomeEvaluacionEnPares.jsx';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />  {/* Agrega el Navbar aquí */}
        <Routes>
          <Route path="/tiposDeEvaluacion" element={<TiposDeEvaluacion />} />
          <Route path="/homeAutoevaluacion" element={<HomeAutoevaluacion />} />
          <Route path="/autoevaluacion" element={<Autoevaluacion />} />
          <Route path="/evaluacionCruzada" element={<EvaluacionCruzada />} />
          <Route path="/homeEvaluacionCruzada" element={<HomeEvaluacionCruzada />} />
          <Route path="/evaluacionEnPares" element={<EvaluacionEnPares />} />
          <Route path="/homeEvaluacionEnPares" element={<HomeEvaluacionEnPares />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

