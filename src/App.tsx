import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { PackageDetail } from './pages/PackageDetail';


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/package/:id" element={<PackageDetail />} />

      </Routes>
    </HashRouter>
  );
}

export default App;
