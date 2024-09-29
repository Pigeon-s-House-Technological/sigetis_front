import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import EvaluationCard from './components/EvaluationCard'; // Componente para la página inicial
import EvaluationForm from './components/EvaluationForm'; // Formulario de la evaluación
import ParesGrupal from './components/ParesGrupal';
import AutoevaluacionGrupal from './components/AutoevaluacionGrupal';
import CruzGrupal from './components/CruzGrupal';
import ParesIndividual from './components/ParesIndividual';
import AutoevaluacionIndividual from './components/AutoevaluacionIndividual';
import EvaluacionesGrupalPares from './components/EvaluacionesGrupalPares';
import EvaluationType from './components/EvaluationType';
import EvaluacionIndividualPares from './components/EvaluacionIndividualPares';
import EvaluacionIndividualAuto from './components/EvaluacionIndividualAuto';
import EvaluacionGrupalAuto from './components/EvaluacionGrupalAuto';

import EvaluacionGrupalCruzada from './components/EvaluacionGrupalCruzada';





import Footer from './components/Footer';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
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
        
        <Route path="/" element={<EvaluationType />} />
        <Route path="/tipoevaluacion/grupal/pares" element={<EvaluacionesGrupalPares />} />  {/* Ruta para Evaluación por pares */}

        <Route path="/" element={<EvaluationType />} />
        <Route path="/tipoevaluacion/individual/pares" element={<EvaluacionIndividualPares />} />  {/* Ruta para Evaluación por pares */}


        <Route path="/" element={<EvaluationType />} />
        <Route path="/tipoevaluacion/individual/autoevaluacion" element={<EvaluacionIndividualAuto />} />  {/* Ruta para Evaluación por pares */}

        <Route path="/" element={<EvaluationType />} />
        <Route path="/tipoevaluacion/grupal/autoevaluacion" element={<EvaluacionGrupalAuto />} />  {/* Ruta para Evaluación por pares */}

        <Route path="/" element={<EvaluationType />} />
        <Route path="/tipoevaluacion/grupal/cruzada" element={<EvaluacionGrupalCruzada />} />  {/* Ruta para Evaluación por pares */}


        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;