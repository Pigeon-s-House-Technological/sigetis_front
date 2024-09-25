import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HistoriaHU from './components/GestionarActi/HistoriaHU';
import DetalleHistoria from './components/GestionarActi/DetalleHistoria';

const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/Gestion" />} />
          <Route path="/Gestion" element={<HistoriaHU />} />
          <Route path="/detalle/:id" element={<DetalleHistoria />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
