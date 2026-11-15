import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useSiga } from '../../context/SigaContext.jsx';
import Icon from '../common/Icon.jsx';

const GRUPOS = [
  {
    titulo: 'Gestión',
    items: [
      { to: '/activos', label: 'Activos', icon: 'box', pendiente: 'Ángela' },
      { to: '/prestamos', label: 'Préstamos', icon: 'swap', pendiente: 'Veronica' },
      { to: '/devoluciones', label: 'Devoluciones', icon: 'return', pendiente: 'Veronica' },
      { to: '/ordenes', label: 'Órdenes de trabajo', icon: 'wrench', pendiente: 'Veronica' },
      { to: '/reportes-dano', label: 'Reportes de daño', icon: 'alert', pendiente: 'Veronica' },
      { to: '/qr', label: 'Consultar QR', icon: 'qr', pendiente: 'Veronica' },
    ],
  },
  {
    titulo: 'Administración',
    items: [
      { to: '/usuarios', label: 'Usuarios', icon: 'users', pendiente: 'Ángela', soloAdmin: true },
      { to: '/perfil', label: 'Mi perfil', icon: 'user', pendiente: 'Ángela' },
    ],
  },
];

export default function Sidebar({ open = false, onClose }) {
  const { user } = useAuth();
  const { resetDemo } = useSiga();

  return (
    <aside className={`sidebar ${open ? 'sidebar--open' : ''}`.trim()}>
      <div className="sidebar__brand">
        <span className="sidebar__logo">
          <Icon name="shield" size={22} />
        </span>
        <div className="sidebar__brand-text">
          <strong>SIGA</strong>
          <span>Gestión de activos</span>
        </div>
        <button
          type="button"
          className="sidebar__close"
          onClick={onClose}
          aria-label="Cerrar menú"
        >
          <Icon name="close" size={18} />
        </button>
      </div>

      <div className="sidebar__status">
        <span className="status-dot" aria-hidden="true" />
        <span>Base lista · módulos en desarrollo</span>
      </div>

      <nav className="sidebar__nav" aria-label="Menú principal">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`.trim()
          }
          onClick={onClose}
        >
          <Icon name="dashboard" />
          <span>Panel principal</span>
        </NavLink>

        {GRUPOS.map((grupo) => {
          const items = grupo.items.filter(
            (item) => !item.soloAdmin || user?.rol === 'Administrador',
          );

          return (
            <div className="sidebar__group" key={grupo.titulo}>
              <p className="sidebar__group-title">{grupo.titulo}</p>
              {items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`.trim()
                  }
                  onClick={onClose}
                  title={item.pendiente ? `Pendiente: ${item.pendiente}` : undefined}
                >
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
                  {item.pendiente ? (
                    <span
                      className="sidebar__pending"
                      title={`Pendiente: ${item.pendiente}`}
                    >
                      {item.pendiente === 'Ángela' ? 'A' : 'V'}
                    </span>
                  ) : null}
                </NavLink>
              ))}
            </div>
          );
        })}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__user">
          <span className="avatar">{user?.iniciales || 'SR'}</span>
          <div>
            <strong>{user?.nombre || 'Invitado'}</strong>
            <span>{user?.rol || 'Sin sesión'}</span>
          </div>
        </div>
        <button
          type="button"
          className="sidebar__reset"
          onClick={() => {
            resetDemo();
            onClose?.();
          }}
          title="Vuelve a cargar los datos de prueba iniciales"
        >
          <Icon name="refresh" size={14} />
          Restablecer datos demo
        </button>
      </div>
    </aside>
  );
}
