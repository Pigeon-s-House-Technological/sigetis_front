
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Principal/Navbar.js';
import Footer from './components/Principal/Footer.js';
import Homepage from './components/Principal/Homepage.js';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
//importaciones de componentes de sus respectivos indices (para optimizar espacio)
import { EvaluationCard, EvaluationForm } from './components/RealizarEvaluacion';
import { EvaluationType, Asignar } from './components/AsignarEvaluacion';
import { TiposDeEvaluacion, HomeAutoevaluacion, HomeEvaluacionCruzada, 
          HomeEvaluacionEnPares, CriteriosEvaluacion, PreguntaEvaluation } from './components/TiposDeEvaluacion';
import { HistoriaHU, DetalleHistoria, Sprints, Resultados } from './components/GestionTareas/index.js';
import { PlanillaEvaluacion, PlanillaEvaluacionActividades, PlanillaEvaluacionEvaluaciones } from './components/PlanillaEvaluacion';
import { RegistroDocente } from './components/RegistroTutor';
import {  LoginModal } from './components/Login';
import HomeGrupo from './components/Grupo/HomeGrupo.jsx';
import EditarGrupo from './components/Grupo/EditarGrupo.jsx';
import PerfilUsuario from './components/PerfilUsuario/PerfilUsuario.js';
import EditarPerfil from './components/PerfilUsuario/EditarPerfil.js';
import RegistrarGrupo from './components/Grupo/RegistrarGrupo.jsx'

import RegistroEstudiante from './components/RegistroEstudiante/RegistroEstudiante.js';



import { ProtectedRoute } from './components/ProtectedRoute.jsx';


//Fin importaciones de componentes de sus respectivos indices (para optimizar espacio)

function App() {

// Crear el estado 'userType'
const [userType, setUserType] = useState('student'); // 'student' por defecto
const [user,setUser] = useState(null)

// Crear la función 'toggleUserType' para cambiar el tipo de usuario
const toggleUserType = (type) => {
  setUserType(type); // Actualiza el estado con 'student' o 'teacher'
};

useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.userData);
    } catch (error) {
      setUser(null);
      console.error('Error al parsear los datos del usuario:', error); 
    }
  }
}, []);

  return (
    <Router>
      <div className="app-container">
         {/* Pasamos userType como prop a Navbar y Footer */}
         <Navbar userType={userType} />
        
        <div className='content'>        
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginModal userType={userType} toggleUserType={toggleUserType} />} />
          <Route path="/perfil" element={<PerfilUsuario />} />
          <Route path="/editarPerfil" element={<EditarPerfil />} />
          <Route path="/registrarGrupo" element={<RegistrarGrupo />} />
          <Route path="/homeGrupo" element={<HomeGrupo />} />



          {/* Rutas protegidas para Estudiante */}
          <Route element={<ProtectedRoute tipo_usuario={user?.tipo_usuario} allowedTypes={["3", "2", "0"]} redirectTo="/" />} >
            <Route path="/evaluacion" element={<EvaluationCard />} />
            <Route path="/perfil" element={<PerfilUsuario />} />
            <Route path="/editarPerfil" element={<EditarPerfil />} />
            <Route path="/evaluacion/formulario" element={<EvaluationForm />} />
            <Route path="/evaluacion" element={<EvaluationCard />} />
            <Route path="/evaluacion/formulario" element={<EvaluationForm />} />
            <Route path="/historiaHU/:id" element={<HistoriaHU />} />
            <Route path="/detalle/:id" element={<DetalleHistoria />} />
            <Route path="/sprints" element={<Sprints />} />
            <Route path="/resultados/:idActividad" element={<Resultados />} />
            
           
          </Route>

          {/* Rutas protegidas para Docente */}
          <Route element={<ProtectedRoute tipo_usuario={user?.tipo_usuario} allowedTypes={["1", "0"]} redirectTo="/" />} >
            <Route path="/planilla" element={<PlanillaEvaluacion />} />
            <Route path="/perfil" element={<PerfilUsuario />} />
            <Route path="/editarPerfil" element={<EditarPerfil />} />
            <Route path="/planilla/actividades/:idGrupo" element={<PlanillaEvaluacionActividades />} />
            <Route path="/planilla/evaluaciones/:idGrupo" element={<PlanillaEvaluacionEvaluaciones />} />
            <Route path="/gestionarEvaluacion" element={<TiposDeEvaluacion />} />
            <Route path="/homeAutoevaluacion" element={<HomeAutoevaluacion />} />
            <Route path="/gestionEvaluacion/:id" element={<CriteriosEvaluacion />} />
            <Route path="/homeEvaluacionCruzada" element={<HomeEvaluacionCruzada />} />
            <Route path="/homeEvaluacionEnPares" element={<HomeEvaluacionEnPares />} />
            <Route path="/criterio/:id" element={<PreguntaEvaluation />} />
            <Route path="/asignarEvaluacion" element={<EvaluationType />} />
            <Route path="/asignarEvaluacion/:destinatario/:tipo" element={<Asignar />} />
            <Route path="/registrarGrupo" element={<RegistrarGrupo />} />
            <Route path="/homeGrupo" element={<HomeGrupo />} />
            <Route path="/editarGrupo/:id" element={<EditarGrupo />} />
          </Route>

          {/* Rutas protegidas para Jefe grupo */}
          <Route element={<ProtectedRoute tipo_usuario={user?.tipo_usuario} allowedTypes={["2", "0"]} redirectTo="/" />} >
         
            
          </Route>

          <Route element={<ProtectedRoute tipo_usuario={user?.tipo_usuario} allowedTypes={["0"]} redirectTo="/" />} >
          <Route path="/planilla" element={<PlanillaEvaluacion />} />
            <Route path="/registroDocente" element={<RegistroDocente />} />
            <Route path="/registroEstudiante" element={<RegistroEstudiante />} />
            <Route path="/perfil" element={<PerfilUsuario />} />
            <Route path="/editarPerfil" element={<EditarPerfil />} />

          </Route>
          
        </Routes>
        </div>
        <Footer userType={userType} /> {/* Pasamos userType como prop */}
      </div>
    </Router>
  );
}

export default App;
