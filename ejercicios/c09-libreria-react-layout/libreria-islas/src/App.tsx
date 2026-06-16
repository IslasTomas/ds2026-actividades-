
import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';

import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import LibroDetail from './pages/LibroDetail';

function App() {
  return (
    <>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/libros/:id" element={<LibroDetail />} />
      </Routes>
    </Layout>
    </>
  );
}

export default App;
