import { CATEGORIAS_ACTIVO, ESTADOS_ACTIVO } from '../../data/mockData.js';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';

/**
 * Barra de filtros del inventario de activos.
 *
 * Contrato con ActivosPage:
 *   filters  { search, categoria, estado }
 *   onChange recibe el evento de los campos
 *   onClear  restablece los filtros
 */
export default function ActivoFilters({ filters = {}, onChange, onClear }) {
  return (
    <div className="filters">
      <Input
        label="Buscar"
        name="search"
        type="search"
        placeholder="Código, nombre, responsable, marca o serie"
        value={filters.search ?? ''}
        onChange={onChange}
      />

      <Select
        label="Categoría"
        name="categoria"
        placeholder="Todas"
        options={CATEGORIAS_ACTIVO}
        value={filters.categoria ?? ''}
        onChange={onChange}
      />

      <Select
        label="Estado"
        name="estado"
        placeholder="Todos"
        options={ESTADOS_ACTIVO}
        value={filters.estado ?? ''}
        onChange={onChange}
      />

      <Button variant="secondary" onClick={onClear}>
        Limpiar
      </Button>
    </div>
  );
}
