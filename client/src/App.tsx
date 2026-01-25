import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { PackageDetail } from './pages/PackageDetail';
import { Explore } from './pages/Explore';
import { Saved } from './pages/Saved';
import { Profile } from './pages/Profile';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CategoriesPage } from './pages/admin/CategoriesPage';
import { TripsPage } from './pages/admin/TripsPage';


function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/package/:id" element={<PackageDetail />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="trips" element={<TripsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
