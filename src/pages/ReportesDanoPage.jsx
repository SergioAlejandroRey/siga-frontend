import { useMemo, useState } from 'react';
import { useSiga } from '../context/SigaContext.jsx';
import ReporteDanoForm from '../components/reportes/ReporteDanoForm.jsx';
import Table from '../components/ui/Table.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import Select from '../components/ui/Select.jsx';
import Modal from '../components/ui/Modal.jsx';
import Icon from '../components/common/Icon.jsx';
import { formatDate } from '../utils/format.js';
import { tonoEstado, tonoPrioridad } from '../utils/status.js';

const ESTADOS = ['Abierto', 'En revisión', 'Cerrado'];
const PRIORIDADES = ['Alta', 'Media', 'Baja'];

export default function ReportesDanoPage() {
  const { reportes, activos, addReporte, updateReporte, loading } = useSiga();
  const [estado, setEstado] = useState('');
  const [prioridad, setPrioridad] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [aviso, setAviso] = useState('');

  const filtrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    return reportes.filter((reporte) => {
      if (estado && reporte.estado !== estado) return false;
      if (prioridad && reporte.prioridad !== prioridad) return false;
      if (!termino) return true;
      return [reporte.codigo, reporte.activoNombre, reporte.activoCodigo, reporte.descripcion, reporte.reportadoPor]
        .filter(Boolean)
        .some((valor) => String(valor).toLowerCase().includes(termino));
    });
  }, [reportes, estado, prioridad, busqueda]);

  const resumen = useMemo(
    () => ({
      abiertos: reportes.filter((item) => item.estado !== 'Cerrado').length,
      alta: reportes.filter((item) => item.prioridad === 'Alta' && item.estado !== 'Cerrado').length,
      cerrados: reportes.filter((item) => item.estado === 'Cerrado').length,
    }),
    [reportes],
  );

  function handleCreate(data) {
    addReporte(data);
    setModalAbierto(false);
    setAviso('Reporte de daño registrado correctamente.');
  }

  function cerrarReporte(reporte) {
    updateReporte(reporte.id, { estado: 'Cerrado' });
    setAviso(`El reporte ${reporte.codigo} quedó cerrado.`);
  }

  const columnas = [
    { clave: 'codigo', titulo: 'Código' },
    {
      clave: 'activo',
      titulo: 'Activo',
      render: (fila) => (
        <div className="cell-stack">
          <strong>{fila.activoNombre}</strong>
          <span>{fila.activoCodigo}</span>
        </div>
      ),
    },
    {
      clave: 'descripcion',
      titulo: 'Descripción',
      render: (fila) => <span className="cell-note">{fila.descripcion}</span>,
    },
    {
      clave: 'prioridad',
      titulo: 'Prioridad',
      render: (fila) => (
        <Badge tone={tonoPrioridad(fila.prioridad)}>{fila.prioridad}</Badge>
      ),
    },
    {
      clave: 'reportadoPor',
      titulo: 'Reportado por',
      render: (fila) => (
        <div className="cell-stack">
          <strong>{fila.reportadoPor}</strong>
          <span>{formatDate(fila.fecha)}</span>
        </div>
      ),
    },
    {
      clave: 'estado',
      titulo: 'Estado',
      render: (fila) => (
        <Badge tone={tonoEstado(fila.estado)}>{fila.estado}</Badge>
      ),
    },
    {
      clave: 'acciones',
      titulo: 'Acciones',
      render: (fila) =>
        fila.estado !== 'Cerrado' ? (
          <Button size="sm" variant="ghost" onClick={() => cerrarReporte(fila)}>
            Cerrar
          </Button>
        ) : (
          <span className="muted">Cerrado</span>
        ),
    },
  ];

  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <span className="eyebrow">Novedades</span>
          <h2>Reportes de daño</h2>
          <p>
            Registra los daños detectados y haz seguimiento hasta su cierre.
          </p>
        </div>
        <div className="page-hero__actions">
          <Button
            icon={<Icon name="alert" size={16} />}
            onClick={() => setModalAbierto(true)}
          >
            Reportar daño
          </Button>
        </div>
      </section>

      {aviso ? (
        <div className="form-alert form-alert--success" role="status">
          <Icon name="check" size={16} />
          <span>{aviso}</span>
          <button
            type="button"
            className="form-alert__close"
            onClick={() => setAviso('')}
            aria-label="Cerrar aviso"
          >
            ×
          </button>
        </div>
      ) : null}

      <div className="stat-chips">
        <div className="stat-chip">
          <span className="stat-chip__icon stat-chip__icon--red">
            <Icon name="alert" size={16} />
          </span>
          <div>
            <strong>{resumen.abiertos}</strong>
            <span>Abiertos</span>
          </div>
        </div>
        <div className="stat-chip">
          <span className="stat-chip__icon stat-chip__icon--amber">
            <Icon name="wrench" size={16} />
          </span>
          <div>
            <strong>{resumen.alta}</strong>
            <span>Prioridad alta</span>
          </div>
        </div>
        <div className="stat-chip">
          <span className="stat-chip__icon stat-chip__icon--green">
            <Icon name="check" size={16} />
          </span>
          <div>
            <strong>{resumen.cerrados}</strong>
            <span>Cerrados</span>
          </div>
        </div>
      </div>

      <section className="card">
        <div className="filters">
          <Input
            label="Buscar"
            name="busqueda-reporte"
            placeholder="Código, activo o descripción"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
          />
          <Select
            label="Estado"
            name="estado-reporte"
            placeholder="Todos"
            options={ESTADOS}
            value={estado}
            onChange={(event) => setEstado(event.target.value)}
          />
          <Select
            label="Prioridad"
            name="prioridad-reporte"
            placeholder="Todas"
            options={PRIORIDADES}
            value={prioridad}
            onChange={(event) => setPrioridad(event.target.value)}
          />
          <Button
            variant="secondary"
            onClick={() => {
              setBusqueda('');
              setEstado('');
              setPrioridad('');
            }}
          >
            Limpiar
          </Button>
        </div>

        <Table
          columnas={columnas}
          datos={filtrados}
          cargando={loading}
          emptyTitle="Sin reportes"
          emptyMessage="No hay reportes que coincidan con los filtros."
        />
      </section>

      <Modal
        open={modalAbierto}
        title="Reportar daño"
        size="lg"
        onClose={() => setModalAbierto(false)}
      >
        <ReporteDanoForm
          activos={activos}
          onSubmit={handleCreate}
          onCancel={() => setModalAbierto(false)}
        />
      </Modal>
    </div>
  );
}
