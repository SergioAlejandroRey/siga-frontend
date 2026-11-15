import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useSiga } from '../context/SigaContext.jsx';
import StatsGrid from '../components/dashboard/StatsGrid.jsx';
import Table from '../components/ui/Table.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Icon from '../components/common/Icon.jsx';
import { tonoEstado } from '../utils/status.js';

const ACCESOS = [
  {
    to: '/activos',
    titulo: 'Activos',
    texto: 'Inventario y ficha de cada equipo.',
    icono: 'box',
    dueno: 'Ángela',
    tono: 'blue',
  },
  {
    to: '/prestamos',
    titulo: 'Préstamos',
    texto: 'Registrar salidas y responsables.',
    icono: 'swap',
    dueno: 'Veronica',
    tono: 'amber',
  },
  {
    to: '/qr',
    titulo: 'Consultar QR',
    texto: 'Buscar un activo por su código.',
    icono: 'qr',
    dueno: 'Veronica',
    tono: 'teal',
  },
  {
    to: '/reportes-dano',
    titulo: 'Reportar daño',
    texto: 'Registrar novedades de los activos.',
    icono: 'alert',
    dueno: 'Veronica',
    tono: 'red',
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const { stats, loading, prestamos, ordenes, reportes } = useSiga();
  const navigate = useNavigate();

  const actividad = useMemo(() => {
    const movimientos = [
      ...prestamos.slice(0, 3).map((prestamo) => ({
        id: `p-${prestamo.id}`,
        tipo: 'Préstamo',
        detalle: `${prestamo.activoNombre} · ${prestamo.solicitante}`,
        fecha: prestamo.fechaPrestamo,
        estado: prestamo.estado,
      })),
      ...ordenes.slice(0, 2).map((orden) => ({
        id: `o-${orden.id}`,
        tipo: 'Orden',
        detalle: `${orden.codigo} · ${orden.activoNombre}`,
        fecha: orden.fecha,
        estado: orden.estado,
      })),
      ...reportes.slice(0, 2).map((reporte) => ({
        id: `r-${reporte.id}`,
        tipo: 'Reporte',
        detalle: `${reporte.codigo} · ${reporte.activoNombre}`,
        fecha: reporte.fecha,
        estado: reporte.estado,
      })),
    ];

    return movimientos
      .sort((a, b) => b.fecha.localeCompare(a.fecha))
      .slice(0, 6);
  }, [prestamos, ordenes, reportes]);

  const columnas = [
    { clave: 'tipo', titulo: 'Tipo' },
    { clave: 'detalle', titulo: 'Detalle' },
    { clave: 'fecha', titulo: 'Fecha' },
    {
      clave: 'estado',
      titulo: 'Estado',
      render: (fila) => (
        <Badge tone={tonoEstado(fila.estado)}>{fila.estado}</Badge>
      ),
    },
  ];

  const primerNombre = user?.nombre?.split(' ')[0] || 'bienvenido';

  return (
    <div className="dashboard">
      <section className="page-hero">
        <div>
          <span className="eyebrow">Panel principal</span>
          <h2>Hola, {primerNombre} 👋</h2>
          <p>
            Este es el resumen del inventario y de las operaciones registradas en
            el SIGA.
          </p>
        </div>
        <div className="page-hero__actions">
          <Button variant="secondary" onClick={() => navigate('/activos')}>
            Ver inventario
          </Button>
          <Button
            icon={<Icon name="plus" size={16} />}
            onClick={() => navigate('/activos/nuevo')}
          >
            Nuevo activo
          </Button>
        </div>
      </section>

      <StatsGrid totales={stats} cargando={loading} />

      <div className="dashboard-grid">
        <section className="card">
          <div className="card__header">
            <div>
              <h3>Actividad reciente</h3>
              <p>Últimos movimientos de préstamos, órdenes y reportes.</p>
            </div>
            <Badge tone="blue">{actividad.length} registros</Badge>
          </div>
          <Table
            columnas={columnas}
            datos={actividad}
            cargando={loading}
            emptyTitle="Sin actividad"
            emptyMessage="Cuando se registren movimientos aparecerán aquí."
          />
        </section>

        <section className="card">
          <div className="card__header">
            <div>
              <h3>Estado del proyecto</h3>
              <p>Avance de la base y de los módulos asignados.</p>
            </div>
          </div>

          <div className="project-status">
            <div className="project-status__item project-status__item--done">
              <span className="project-status__icon">
                <Icon name="check" size={16} />
              </span>
              <div>
                <strong>Base y componentes compartidos</strong>
                <span>Login, layout, UI, dashboard, rutas y datos mock.</span>
              </div>
              <Badge tone="green">Listo</Badge>
            </div>

            <div className="project-status__item">
              <span className="project-status__icon">
                <Icon name="box" size={16} />
              </span>
              <div>
                <strong>Activos, usuarios y perfil</strong>
                <span>Módulos asignados a Ángela.</span>
              </div>
              <Badge tone="amber">Pendiente</Badge>
            </div>

            <div className="project-status__item">
              <span className="project-status__icon">
                <Icon name="swap" size={16} />
              </span>
              <div>
                <strong>Préstamos, devoluciones, órdenes, reportes y QR</strong>
                <span>Módulos asignados a Veronica.</span>
              </div>
              <Badge tone="amber">Pendiente</Badge>
            </div>
          </div>

          <div className="project-status__note">
            <Icon name="database" size={16} />
            <span>
              Los datos viven en localStorage. Usa “Restablecer datos demo” en el
              menú lateral para volver a los valores iniciales.
            </span>
          </div>
        </section>
      </div>

      <section className="card">
        <div className="card__header">
          <div>
            <h3>Accesos rápidos</h3>
            <p>
              Las páginas de los módulos ya están conectadas a las rutas del
              proyecto.
            </p>
          </div>
        </div>

        <div className="quick-actions">
          {ACCESOS.map((accion) => (
            <button
              key={accion.to}
              type="button"
              className="quick-action"
              onClick={() => navigate(accion.to)}
            >
              <span
                className={`quick-action__icon quick-action__icon--${accion.tono}`}
              >
                <Icon name={accion.icono} size={20} />
              </span>
              <span className="quick-action__body">
                <strong>{accion.titulo}</strong>
                <span>{accion.texto}</span>
              </span>
              <span className="quick-action__owner">{accion.dueno}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
