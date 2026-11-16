/**
 * ActivoFilters — pieza pendiente de Ángela.
 *
 * Contrato acordado con ActivosPage:
 *   filters  { search, categoria, estado }
 *   onChange recibe el evento de los campos
 *   onClear  restablece los filtros
 *
 * Marcador temporal para que la aplicación compile. Al reemplazarlo por la
 * implementación de la guía, ActivosPage lo usa sin cambiar nada más.
 */
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';

export default function ActivoFilters({ filters = {}, onClear }) {
  const activos = Object.entries(filters).filter(([, valor]) => Boolean(valor));

  return (
    <div className="pending-slot">
      <div className="pending-slot__head">
        <div>
          <strong>ActivoFilters</strong>
          <p>Buscador y filtros por categoría y estado.</p>
        </div>
        <Badge tone="amber">Pendiente</Badge>
      </div>
      <span className="pending-slot__meta">
        {activos.length
          ? `${activos.length} filtro(s) listo(s) para conectar.`
          : 'La barra de filtros se activará al subir este componente.'}
      </span>
      <Button variant="secondary" size="sm" onClick={onClear}>
        Limpiar
      </Button>
    </div>
  );
}
