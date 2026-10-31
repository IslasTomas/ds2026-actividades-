
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import LibroDetail from './pages/LibroDetail';
import AltaLibro from './pages/AltaLibro';
import Login from './pages/Login';
import SinPermiso from './pages/SinPermiso';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/libros/:id" element={<LibroDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sin-permiso" element={<SinPermiso />} />

          <Route element={<PrivateRoute rol="ADMIN" />}>
            <Route path="/libros/nuevo" element={<AltaLibro />} />
          </Route>
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
