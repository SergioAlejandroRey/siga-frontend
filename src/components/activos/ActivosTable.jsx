/**
 * ActivosTable — pieza pendiente de Ángela.
 *
 * Contrato acordado con ActivosPage:
 *   activos  array de activos ya filtrados
 *   onView   abre el detalle
 *   onEdit   abre la edición
 *   onDelete abre la confirmación de eliminación
 *
 * Marcador temporal para que la aplicación compile. Al reemplazarlo por la
 * implementación de la guía, ActivosPage lo usa sin cambiar nada más.
 */
import Badge from '../ui/Badge.jsx';

export default function ActivosTable({ activos = [] }) {
  return (
    <div className="pending-slot pending-slot--block">
      <div className="pending-slot__head">
        <div>
          <strong>ActivosTable</strong>
          <p>Tabla del inventario con acciones Ver, Editar y Eliminar.</p>
        </div>
        <Badge tone="amber">Pendiente</Badge>
      </div>
      <p className="pending-slot__meta">
        {activos.length} activo(s) listos para mostrarse en la tabla.
      </p>
    </div>
  );
}
