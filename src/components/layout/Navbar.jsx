import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Button from '../ui/Button.jsx';
import Modal from '../ui/Modal.jsx';
import Icon from '../common/Icon.jsx';

const TITULOS = {
  '/': 'Panel principal',
  '/activos': 'Activos',
  '/activos/nuevo': 'Nuevo activo',
  '/prestamos': 'Préstamos',
  '/devoluciones': 'Devoluciones',
  '/ordenes': 'Órdenes de trabajo',
  '/reportes-dano': 'Reportes de daño',
  '/qr': 'Consultar QR',
  '/usuarios': 'Usuarios',
  '/perfil': 'Mi perfil',
};

function tituloDeRuta(pathname) {
  if (pathname.startsWith('/activos/')) return 'Detalle del activo';
  return TITULOS[pathname] || 'SIGA';
}

export default function Navbar({ onMenu }) {
  const { user, logout } = useAuth();
  const [confirmarSalida, setConfirmarSalida] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const fecha = new Intl.DateTimeFormat('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());
  const fechaCapitalizada = fecha.charAt(0).toUpperCase() + fecha.slice(1);

  function cerrarSesion() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <>
      <header className="topbar">
        <div className="topbar__left">
          <button
            type="button"
            className="topbar__menu"
            onClick={onMenu}
            aria-label="Abrir menú"
          >
            <Icon name="menu" size={20} />
          </button>
          <div>
            <p className="topbar__eyebrow">SIGA · {fechaCapitalizada}</p>
            <h1 className="topbar__title">{tituloDeRuta(location.pathname)}</h1>
          </div>
        </div>

        <div className="topbar__right">
          <span className="topbar__role">
            <Icon name="shield" size={14} />
            {user?.rol || 'Invitado'}
          </span>
          <div className="topbar__user">
            <span className="avatar">{user?.iniciales || 'SR'}</span>
            <div>
              <strong>{user?.nombre || 'Invitado'}</strong>
              <span>{user?.email || 'Sin sesión'}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            icon={<Icon name="logout" size={16} />}
            onClick={() => setConfirmarSalida(true)}
          >
            Salir
          </Button>
        </div>
      </header>

      <Modal
        open={confirmarSalida}
        title="Cerrar sesión"
        onClose={() => setConfirmarSalida(false)}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setConfirmarSalida(false)}
            >
              Cancelar
            </Button>
            <Button variant="danger" onClick={cerrarSesion}>
              Cerrar sesión
            </Button>
          </>
        }
      >
        <p>
          ¿Seguro que quieres cerrar la sesión de{' '}
          <strong>{user?.nombre}</strong>?
        </p>
        <p className="muted">
          Los datos de prueba quedan guardados en este navegador.
        </p>
      </Modal>
    </>
  );
}
