import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout.jsx';
import ProtectedRoute from '../components/auth/ProtectedRoute.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import ActivosPage from '../pages/ActivosPage.jsx';
import ActivoForm from '../components/activos/ActivoForm.jsx';
import ActivoDetail from '../components/activos/ActivoDetail.jsx';
import PrestamosPage from '../pages/PrestamosPage.jsx';
import DevolucionesPage from '../pages/DevolucionesPage.jsx';
import OrdenesPage from '../pages/OrdenesPage.jsx';
import ReportesDanoPage from '../pages/ReportesDanoPage.jsx';
import QrPage from '../pages/QrPage.jsx';
import UsuariosPage from '../pages/UsuariosPage.jsx';
import PerfilPage from '../pages/PerfilPage.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="activos" element={<ActivosPage />} />
        <Route path="activos/nuevo" element={<ActivoForm />} />
        <Route path="activos/:id" element={<ActivoDetail />} />
        <Route path="prestamos" element={<PrestamosPage />} />
        <Route path="devoluciones" element={<DevolucionesPage />} />
        <Route path="ordenes" element={<OrdenesPage />} />
        <Route path="reportes-dano" element={<ReportesDanoPage />} />
        <Route path="qr" element={<QrPage />} />
        <Route
          path="usuarios"
          element={
            <ProtectedRoute roles={['Administrador']}>
              <UsuariosPage />
            </ProtectedRoute>
          }
        />
        <Route path="perfil" element={<PerfilPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
