import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GestionAct from './components/GestionarActi/GestionAct';
import AgregarHU from './components/GestionarActi/AgregarHU';
import AgregarTarea from './components/GestionarActi/AgregarTarea';
import HistoriaHU from './components/GestionarActi/HistoriaHU';
import DetalleHistoria from './components/GestionarActi/DetalleHistoria';

const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/Gestion" />} />
          <Route path="/Gestion" element={<GestionAct />} />
          <Route path="/AgregarHU" element={<AgregarHU />} />
          <Route path="/AgregarTarea" element={<AgregarTarea />} />
          <Route path="/HistoriaHU" element={<HistoriaHU />} />
          <Route path="/detalle/:id" element={<DetalleHistoria />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
