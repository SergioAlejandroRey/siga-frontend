import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSiga } from '../context/SigaContext.jsx';
import DevolucionForm from '../components/prestamos/DevolucionForm.jsx';
import Table from '../components/ui/Table.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import Modal from '../components/ui/Modal.jsx';
import Icon from '../components/common/Icon.jsx';
import { formatDate } from '../utils/format.js';
import { tonoEstado } from '../utils/status.js';

export default function DevolucionesPage() {
  const { devoluciones, prestamos, registrarDevolucion, loading } = useSiga();
  const [searchParams] = useSearchParams();
  const [busqueda, setBusqueda] = useState('');
  const [modalAbierto, setModalAbierto] = useState(Boolean(searchParams.get('prestamo')));
  const [aviso, setAviso] = useState('');

  const filtradas = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    if (!termino) return devoluciones;
    return devoluciones.filter((item) =>
      [item.codigo, item.activoNombre, item.activoCodigo, item.recibidoPor]
        .filter(Boolean)
        .some((valor) => String(valor).toLowerCase().includes(termino)),
    );
  }, [devoluciones, busqueda]);

  const pendientes = prestamos.filter(
    (item) => item.estado === 'Activo' || item.estado === 'Vencido',
  ).length;

  function handleSubmit(data) {
    const { prestamoId, ...resto } = data;
    registrarDevolucion(prestamoId, resto);
    setModalAbierto(false);
    setAviso('Devolución registrada. El activo quedó disponible según su estado.');
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
    { clave: 'fechaDevolucion', titulo: 'Fecha', render: (fila) => formatDate(fila.fechaDevolucion) },
    {
      clave: 'estadoActivo',
      titulo: 'Estado del activo',
      render: (fila) => (
        <Badge tone={tonoEstado(fila.estadoActivo)}>{fila.estadoActivo}</Badge>
      ),
    },
    { clave: 'recibidoPor', titulo: 'Recibido por' },
    {
      clave: 'observaciones',
      titulo: 'Observaciones',
      render: (fila) => (
        <span className="cell-note">{fila.observaciones || 'Sin observaciones'}</span>
      ),
    },
  ];

  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <span className="eyebrow">Operación</span>
          <h2>Devoluciones</h2>
          <p>
            Cierra los préstamos y registra el estado en que regresa cada activo.
          </p>
        </div>
        <div className="page-hero__actions">
          <Button
            icon={<Icon name="return" size={16} />}
            onClick={() => setModalAbierto(true)}
          >
            Registrar devolución
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
          <span className="stat-chip__icon stat-chip__icon--amber">
            <Icon name="swap" size={16} />
          </span>
          <div>
            <strong>{pendientes}</strong>
            <span>Préstamos por devolver</span>
          </div>
        </div>
        <div className="stat-chip">
          <span className="stat-chip__icon stat-chip__icon--green">
            <Icon name="check" size={16} />
          </span>
          <div>
            <strong>{devoluciones.length}</strong>
            <span>Devoluciones registradas</span>
          </div>
        </div>
      </div>

      <section className="card">
        <div className="filters filters--compact">
          <Input
            label="Buscar"
            name="busqueda-devolucion"
            placeholder="Código, activo o quien recibe"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
          />
          <Button variant="secondary" onClick={() => setBusqueda('')}>
            Limpiar
          </Button>
        </div>

        <Table
          columnas={columnas}
          datos={filtradas}
          cargando={loading}
          emptyTitle="Sin devoluciones"
          emptyMessage="Cuando se registre una devolución aparecerá aquí."
        />
      </section>

      <Modal
        open={modalAbierto}
        title="Registrar devolución"
        size="lg"
        onClose={() => setModalAbierto(false)}
      >
        <DevolucionForm
          prestamos={prestamos}
          initialPrestamoId={searchParams.get('prestamo') || ''}
          onSubmit={handleSubmit}
          onCancel={() => setModalAbierto(false)}
        />
      </Modal>
    </div>
  );
}
