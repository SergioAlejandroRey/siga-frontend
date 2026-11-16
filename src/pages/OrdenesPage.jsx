import { useMemo, useState } from 'react';
import { useSiga } from '../context/SigaContext.jsx';
import OrdenForm from '../components/ordenes/OrdenForm.jsx';
import Table from '../components/ui/Table.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import Select from '../components/ui/Select.jsx';
import Modal from '../components/ui/Modal.jsx';
import Icon from '../components/common/Icon.jsx';
import { formatDate } from '../utils/format.js';
import { tonoEstado, tonoPrioridad } from '../utils/status.js';

const ESTADOS = ['Pendiente', 'En proceso', 'Finalizada'];

export default function OrdenesPage() {
  const { ordenes, activos, usuarios, addOrden, updateOrden, loading } = useSiga();
  const [estado, setEstado] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [aviso, setAviso] = useState('');

  const tecnicos = usuarios.filter(
    (usuario) => usuario.rol === 'Técnico' && usuario.estado === 'Activo',
  );

  const filtradas = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    return ordenes.filter((orden) => {
      if (estado && orden.estado !== estado) return false;
      if (!termino) return true;
      return [orden.codigo, orden.activoNombre, orden.activoCodigo, orden.tecnico, orden.descripcion]
        .filter(Boolean)
        .some((valor) => String(valor).toLowerCase().includes(termino));
    });
  }, [ordenes, estado, busqueda]);

  const resumen = useMemo(
    () => ({
      pendientes: ordenes.filter((item) => item.estado === 'Pendiente').length,
      proceso: ordenes.filter((item) => item.estado === 'En proceso').length,
      finalizadas: ordenes.filter((item) => item.estado === 'Finalizada').length,
    }),
    [ordenes],
  );

  function handleCreate(data) {
    addOrden(data);
    setModalAbierto(false);
    setAviso('Orden de trabajo creada correctamente.');
  }

  function finalizar(orden) {
    updateOrden(orden.id, { estado: 'Finalizada' });
    setAviso(`La orden ${orden.codigo} quedó finalizada.`);
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
    { clave: 'tipo', titulo: 'Tipo' },
    {
      clave: 'tecnico',
      titulo: 'Técnico',
      render: (fila) => (
        <div className="cell-stack">
          <strong>{fila.tecnico}</strong>
          <span>{formatDate(fila.fecha)}</span>
        </div>
      ),
    },
    {
      clave: 'prioridad',
      titulo: 'Prioridad',
      render: (fila) => (
        <Badge tone={tonoPrioridad(fila.prioridad)}>{fila.prioridad}</Badge>
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
        fila.estado !== 'Finalizada' ? (
          <Button size="sm" variant="ghost" onClick={() => finalizar(fila)}>
            Finalizar
          </Button>
        ) : (
          <span className="muted">Cerrada</span>
        ),
    },
  ];

  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <span className="eyebrow">Mantenimiento</span>
          <h2>Órdenes de trabajo</h2>
          <p>
            Asigna mantenimientos a los técnicos y sigue su estado hasta el cierre.
          </p>
        </div>
        <div className="page-hero__actions">
          <Button
            icon={<Icon name="plus" size={16} />}
            onClick={() => setModalAbierto(true)}
          >
            Nueva orden
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
            <Icon name="wrench" size={16} />
          </span>
          <div>
            <strong>{resumen.pendientes}</strong>
            <span>Pendientes</span>
          </div>
        </div>
        <div className="stat-chip">
          <span className="stat-chip__icon stat-chip__icon--blue">
            <Icon name="refresh" size={16} />
          </span>
          <div>
            <strong>{resumen.proceso}</strong>
            <span>En proceso</span>
          </div>
        </div>
        <div className="stat-chip">
          <span className="stat-chip__icon stat-chip__icon--green">
            <Icon name="check" size={16} />
          </span>
          <div>
            <strong>{resumen.finalizadas}</strong>
            <span>Finalizadas</span>
          </div>
        </div>
      </div>

      <section className="card">
        <div className="filters">
          <Input
            label="Buscar"
            name="busqueda-orden"
            placeholder="Código, activo, técnico..."
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
          />
          <Select
            label="Estado"
            name="estado-orden"
            placeholder="Todos"
            options={ESTADOS}
            value={estado}
            onChange={(event) => setEstado(event.target.value)}
          />
          <Button
            variant="secondary"
            onClick={() => {
              setBusqueda('');
              setEstado('');
            }}
          >
            Limpiar
          </Button>
        </div>

        <Table
          columnas={columnas}
          datos={filtradas}
          cargando={loading}
          emptyTitle="Sin órdenes"
          emptyMessage="No hay órdenes que coincidan con los filtros."
        />
      </section>

      <Modal
        open={modalAbierto}
        title="Nueva orden de trabajo"
        size="lg"
        onClose={() => setModalAbierto(false)}
      >
        <OrdenForm
          activos={activos}
          tecnicos={tecnicos}
          onSubmit={handleCreate}
          onCancel={() => setModalAbierto(false)}
        />
      </Modal>
    </div>
  );
}
