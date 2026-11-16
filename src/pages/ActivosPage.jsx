import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSiga } from '../context/SigaContext.jsx';
import ActivoFilters from '../components/activos/ActivoFilters.jsx';
import ActivosTable from '../components/activos/ActivosTable.jsx';
import Button from '../components/ui/Button.jsx';
import Modal from '../components/ui/Modal.jsx';
import Badge from '../components/ui/Badge.jsx';
import Icon from '../components/common/Icon.jsx';
import { tonoEstado } from '../utils/status.js';

const FILTROS_INICIALES = { search: '', categoria: '', estado: '' };

export default function ActivosPage() {
  const { activos, deleteActivo } = useSiga();
  const navigate = useNavigate();
  const [filters, setFilters] = useState(FILTROS_INICIALES);
  const [porEliminar, setPorEliminar] = useState(null);

  const filtrados = useMemo(() => {
    const termino = filters.search.trim().toLowerCase();

    return activos.filter((activo) => {
      if (filters.categoria && activo.categoria !== filters.categoria) {
        return false;
      }
      if (filters.estado && activo.estado !== filters.estado) {
        return false;
      }
      if (!termino) return true;

      return [activo.nombre, activo.codigo, activo.responsable, activo.marca, activo.serie]
        .filter(Boolean)
        .some((valor) => String(valor).toLowerCase().includes(termino));
    });
  }, [activos, filters]);

  function handleFilterChange(event) {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  function limpiarFiltros() {
    setFilters(FILTROS_INICIALES);
  }

  function confirmarEliminar() {
    if (!porEliminar) return;
    deleteActivo(porEliminar.id);
    setPorEliminar(null);
  }

  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <span className="eyebrow">Inventario</span>
          <h2>Activos de la empresa</h2>
          <p>
            Consulta, filtra y administra los activos registrados en el SIGA.
          </p>
        </div>
        <div className="page-hero__actions">
          <Button
            icon={<Icon name="plus" size={16} />}
            onClick={() => navigate('/activos/nuevo')}
          >
            Nuevo activo
          </Button>
        </div>
      </section>

      <section className="card">
        <ActivoFilters
          filters={filters}
          onChange={handleFilterChange}
          onClear={limpiarFiltros}
        />

        <div className="table-toolbar">
          <span>
            {filtrados.length} de {activos.length} activos
          </span>
          <span className="table-toolbar__hint">
            {porEliminar ? '' : 'Los cambios se guardan en este navegador.'}
          </span>
        </div>

        <ActivosTable
          activos={filtrados}
          onView={(activo) => navigate(`/activos/${activo.id}`)}
          onEdit={(activo) => navigate(`/activos/${activo.id}/editar`)}
          onDelete={(activo) => setPorEliminar(activo)}
        />

        {filtrados.length !== activos.length ? (
          <p className="table-footnote">
            Filtros activos. <button type="button" onClick={limpiarFiltros}>Mostrar todos</button>
          </p>
        ) : null}
      </section>

      <Modal
        open={Boolean(porEliminar)}
        title="Eliminar activo"
        onClose={() => setPorEliminar(null)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setPorEliminar(null)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmarEliminar}>
              Eliminar
            </Button>
          </>
        }
      >
        {porEliminar ? (
          <>
            <p>
              ¿Seguro que quieres eliminar <strong>{porEliminar.nombre}</strong>?
            </p>
            <div className="confirm-summary">
              <span>{porEliminar.codigo}</span>
              <Badge tone={tonoEstado(porEliminar.estado)}>
                {porEliminar.estado}
              </Badge>
            </div>
            <p className="muted">
              Esta acción quita el activo del inventario y no se puede deshacer.
            </p>
          </>
        ) : null}
      </Modal>
    </div>
  );
}
