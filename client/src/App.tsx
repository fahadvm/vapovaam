import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { PackageDetail } from './pages/PackageDetail';
import { Explore } from './pages/Explore';
import { Saved } from './pages/Saved';
import { Profile } from './pages/Profile';


function App() {
  return (
    <HashRouter>
      <Routes>
            <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/package/:id" element={<PackageDetail />} />

      </Routes>
    </HashRouter>
  );
}

export default App;
