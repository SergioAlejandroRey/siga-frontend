import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';

export default function Layout() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();

  return (
    <div className="app-layout">
      <Sidebar open={menuAbierto} onClose={() => setMenuAbierto(false)} />

      {menuAbierto ? (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Cerrar menú"
          onClick={() => setMenuAbierto(false)}
        />
      ) : null}

      <div className="app-main">
        <Navbar onMenu={() => setMenuAbierto(true)} />
        <main className="app-content" key={location.pathname}>
          <Outlet />
        </main>
        <footer className="app-footer">
          <span>SIGA Frontend · GA7-220501096-AA4-EV03</span>
          <span>React + Vite · datos mock en localStorage</span>
        </footer>
      </div>
    </div>
  );
}
