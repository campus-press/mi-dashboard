import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';

// Importamos nuestras páginas
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Login from './pages/Login';


function App() {
  return (
    <Routes>
      {/* RUTA PÚBLICA (Sin Layout, ocupa toda la pantalla) */}
      <Route path="/login" element={<Login />} />

      {/* RUTAS PROTEGIDAS (Envueltas en MainLayout) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clientes" element={<Clients />} />
        {/* Aquí agregarías /finanzas, /configuracion, etc. */}
      </Route>

      {/* Ruta 404 (Opcional) */}
      <Route path="*" element={<div>Página no encontrada</div>} />
    </Routes>
  );
}

export default App;