import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Loader from '../ui/Loader.jsx';

/**
 * Protege las rutas privadas. Si no hay sesión, redirige a /login y conserva
 * la ruta de destino. Si se pasan `roles`, valida que el usuario tenga uno.
 */
export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader fullScreen label="Validando sesión..." />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles?.length && !roles.includes(user.rol)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
