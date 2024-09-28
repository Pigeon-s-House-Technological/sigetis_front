
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TiposDeEvaluacion from './components/TiposDeEvaluacion/TiposDeEvaluacion.jsx';
import HistoriaHU from './components/Gestion/HistoriaHU';
import DetalleHistoria from './components/Gestion/DetalleHistoria';


const App = () => {
  return (
    <Router>
      <div>
        <Navbar />  {/* Agrega el Navbar aquí */}
        <Routes>
          <Route path="/tiposDeEvaluacion" element={<TiposDeEvaluacion />} />
          <Route path="/historiaHU" element={<HistoriaHU />} />
          <Route path="/detalle/:id" element={<DetalleHistoria />} />

        </Routes>
      </div>
    </Router>
  );
};
//esto es una prueba de que mi trabajo esta bien prueba boris repositorio chevere
export default App;

