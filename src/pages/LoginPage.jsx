import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import LoginForm from '../components/auth/LoginForm.jsx';
import Icon from '../components/common/Icon.jsx';

export default function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destino = location.state?.from?.pathname || '/';

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-page">
      <section className="login-brand">
        <div className="login-brand__glow" aria-hidden="true" />

        <div className="login-brand__top">
          <span className="login-brand__logo">
            <Icon name="shield" size={28} />
          </span>
          <div>
            <strong>SIGA</strong>
            <span>Sistema Integral de Gestión de Activos</span>
          </div>
        </div>

        <div className="login-brand__content">
          <span className="eyebrow eyebrow--light">Milagros Group S.A.S.</span>
          <h1>Controla cada activo, desde su compra hasta su baja.</h1>
          <p>
            Una aplicación frontend en React para gestionar activos, préstamos,
            devoluciones, órdenes de trabajo, reportes de daño y consultas por QR.
          </p>

          <ul className="login-brand__features">
            <li>
              <span>
                <Icon name="check" size={14} />
              </span>
              35 componentes organizados por módulos
            </li>
            <li>
              <span>
                <Icon name="check" size={14} />
              </span>
              Roles de Administrador, Técnico y Operario
            </li>
            <li>
              <span>
                <Icon name="check" size={14} />
              </span>
              Datos de prueba persistentes en el navegador
            </li>
          </ul>
        </div>

        <div className="login-brand__footer">
          <span>GA7-220501096-AA4-EV03</span>
          <span>React · Vite · React Router</span>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-panel__card">
          <LoginForm onSuccess={() => navigate(destino, { replace: true })} />
        </div>
        <p className="login-panel__footer">
          SENA · Análisis y Desarrollo de Software · 2026
        </p>
      </section>
    </div>
  );
}
