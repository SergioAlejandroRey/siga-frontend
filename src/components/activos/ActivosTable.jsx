import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import Table from '../ui/Table.jsx';
import Icon from '../common/Icon.jsx';
import { tonoEstado } from '../../utils/status.js';

/**
 * Tabla del inventario de activos.
 *
 * Contrato con ActivosPage:
 *   activos  array de activos ya filtrados
 *   onView   abre el detalle
 *   onEdit   abre la edición
 *   onDelete abre la confirmación de eliminación
 */
export default function ActivosTable({
  activos = [],
  onView,
  onEdit,
  onDelete,
}) {
  const columnas = [
    {
      clave: 'codigo',
      titulo: 'Código',
      render: (activo) => (
        <div className="cell-stack">
          <strong>{activo.codigo}</strong>
          <span style={{ whiteSpace: 'nowrap' }}>
            {activo.codigoQr || 'Sin código QR'}
          </span>
        </div>
      ),
    },
    {
      clave: 'activo',
      titulo: 'Activo',
      render: (activo) => (
        <div className="cell-stack">
          <strong>{activo.nombre}</strong>
          <span>
            {[activo.marca, activo.modelo].filter(Boolean).join(' ') || '—'}
          </span>
          {activo.ubicacion ? <span>{activo.ubicacion}</span> : null}
        </div>
      ),
    },
    {
      clave: 'categoria',
      titulo: 'Categoría',
      render: (activo) => activo.categoria || '—',
    },
    {
      clave: 'responsable',
      titulo: 'Responsable',
      render: (activo) =>
        activo.responsable || <span className="muted">Sin asignar</span>,
    },
    {
      clave: 'estado',
      titulo: 'Estado',
      render: (activo) => (
        <Badge tone={tonoEstado(activo.estado)}>{activo.estado}</Badge>
      ),
    },
    {
      clave: 'acciones',
      titulo: 'Acciones',
      render: (activo) => (
        <div className="actions">
          <Button
            size="sm"
            variant="ghost"
            icon={<Icon name="eye" size={14} />}
            onClick={() => onView?.(activo)}
          >
            Ver
          </Button>
          <Button
            size="sm"
            variant="ghost"
            icon={<Icon name="edit" size={14} />}
            onClick={() => onEdit?.(activo)}
          >
            Editar
          </Button>
          <Button
            size="sm"
            variant="ghost"
            icon={<Icon name="trash" size={14} />}
            onClick={() => onDelete?.(activo)}
          >
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columnas={columnas}
      datos={activos}
      emptyTitle="Sin activos"
      emptyMessage="No hay activos para mostrar."
    />
  );
}
