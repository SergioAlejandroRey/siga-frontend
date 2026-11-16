/**
 * PrestamoForm — pieza pendiente de Veronica.
 *
 * Contrato acordado con PrestamosPage:
 *   activos  array de activos
 *   onSubmit recibe el formulario completo
 *   onCancel cierra el modal
 *
 * Este archivo es un marcador temporal para que la aplicación compile. Al
 * reemplazarlo por la implementación de la guía, PrestamosPage lo usa sin
 * cambiar ninguna otra línea.
 */
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';

export default function PrestamoForm({ activos = [], onCancel }) {
  const disponibles = activos.filter((activo) => activo.estado === 'Disponible');

  return (
    <div className="pending-slot pending-slot--block">
      <div className="pending-slot__head">
        <div>
          <strong>PrestamoForm</strong>
          <p>Formulario para registrar un préstamo de activos.</p>
        </div>
        <Badge tone="amber">Pendiente</Badge>
      </div>
      <p className="pending-slot__meta">
        {disponibles.length} activos disponibles para prestar.
      </p>
      <div className="form-actions">
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}
