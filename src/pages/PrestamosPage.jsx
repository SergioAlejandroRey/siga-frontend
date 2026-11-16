import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSiga } from '../context/SigaContext.jsx';
import PrestamoForm from '../components/prestamos/PrestamoForm.jsx';
import Table from '../components/ui/Table.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import Select from '../components/ui/Select.jsx';
import Modal from '../components/ui/Modal.jsx';
import Icon from '../components/common/Icon.jsx';
import { formatDate } from '../utils/format.js';
import { tonoEstado } from '../utils/status.js';

const ESTADOS = ['Activo', 'Vencido', 'Devuelto'];

export default function PrestamosPage() {
  const { prestamos, activos, addPrestamo, loading } = useSiga();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [estado, setEstado] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [modalAbierto, setModalAbierto] = useState(Boolean(searchParams.get('activo')));
  const [aviso, setAviso] = useState('');

  const filtrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    return prestamos.filter((prestamo) => {
      if (estado && prestamo.estado !== estado) return false;
      if (!termino) return true;
      return [prestamo.codigo, prestamo.activoNombre, prestamo.activoCodigo, prestamo.solicitante]
        .filter(Boolean)
        .some((valor) => String(valor).toLowerCase().includes(termino));
    });
  }, [prestamos, estado, busqueda]);

  const resumen = useMemo(
    () => ({
      activos: prestamos.filter((item) => item.estado === 'Activo').length,
      vencidos: prestamos.filter((item) => item.estado === 'Vencido').length,
      devueltos: prestamos.filter((item) => item.estado === 'Devuelto').length,
    }),
    [prestamos],
  );

  function handleCreate(data) {
    addPrestamo(data);
    setModalAbierto(false);
    setAviso('Préstamo registrado correctamente.');
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
      clave: 'solicitante',
      titulo: 'Solicitante',
      render: (fila) => (
        <div className="cell-stack">
          <strong>{fila.solicitante}</strong>
          <span>Préstamo {fila.codigo}</span>
        </div>
      ),
    },
    {
      clave: 'fechas',
      titulo: 'Fechas',
      render: (fila) => (
        <div className="cell-stack">
          <span>Entrega: {formatDate(fila.fechaPrestamo)}</span>
          <span>Devolución: {formatDate(fila.fechaDevolucion)}</span>
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
        fila.estado === 'Activo' || fila.estado === 'Vencido' ? (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => navigate(`/devoluciones?prestamo=${fila.id}`)}
          >
            Devolver
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
          <span className="eyebrow">Operación</span>
          <h2>Préstamos de activos</h2>
          <p>
            Registra la salida de un activo y controla su fecha de devolución.
          </p>
        </div>
        <div className="page-hero__actions">
          <Button
            icon={<Icon name="plus" size={16} />}
            onClick={() => setModalAbierto(true)}
          >
            Nuevo préstamo
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
          <span className="stat-chip__icon stat-chip__icon--blue">
            <Icon name="swap" size={16} />
          </span>
          <div>
            <strong>{resumen.activos}</strong>
            <span>Activos</span>
          </div>
        </div>
        <div className="stat-chip">
          <span className="stat-chip__icon stat-chip__icon--red">
            <Icon name="alert" size={16} />
          </span>
          <div>
            <strong>{resumen.vencidos}</strong>
            <span>Vencidos</span>
          </div>
        </div>
        <div className="stat-chip">
          <span className="stat-chip__icon stat-chip__icon--green">
            <Icon name="check" size={16} />
          </span>
          <div>
            <strong>{resumen.devueltos}</strong>
            <span>Devueltos</span>
          </div>
        </div>
      </div>

      <section className="card">
        <div className="filters">
          <Input
            label="Buscar"
            name="busqueda-prestamo"
            placeholder="Código, activo o solicitante"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
          />
          <Select
            label="Estado"
            name="estado-prestamo"
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
          datos={filtrados}
          cargando={loading}
          emptyTitle="Sin préstamos"
          emptyMessage="No hay préstamos que coincidan con los filtros."
        />
      </section>

      <Modal
        open={modalAbierto}
        title="Registrar préstamo"
        size="lg"
        onClose={() => setModalAbierto(false)}
      >
        <PrestamoForm
          activos={activos}
          onSubmit={handleCreate}
          onCancel={() => setModalAbierto(false)}
        />
      </Modal>
    </div>
  );
}
