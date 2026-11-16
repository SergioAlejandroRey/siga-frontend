import { useState } from 'react';

// Componente UI especificado: ActivoFilters
// Permite consultar el inventario sin recargar la página y mantiene la lógica de filtrado fuera de la tabla.
export function ActivoFilters({ onFilterChange, onReset }) {
  const [busqueda, setBusqueda] = useState('');
  const [estado, setEstado] = useState('Todos');
  const [categoria, setCategoria] = useState('Todas');

  // Actualiza los filtros en tiempo real sin recargar la página
  const manejarBusqueda = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    if (onFilterChange) {
      onFilterChange({ busqueda: valor, estado, categoria });
    }
  };

  const manejarEstado = (e) => {
    const valor = e.target.value;
    setEstado(valor);
    if (onFilterChange) {
      onFilterChange({ busqueda, estado: valor, categoria });
    }
  };

  const manejarCategoria = (e) => {
    const valor = e.target.value;
    setCategoria(valor);
    if (onFilterChange) {
      onFilterChange({ busqueda, estado, categoria: valor });
    }
  };

  const manejarLimpiar = () => {
    setBusqueda('');
    setEstado('Todos');
    setCategoria('Todas');
    if (onReset) {
      onReset();
    } else if (onFilterChange) {
      onFilterChange({ busqueda: '', estado: 'Todos', categoria: 'Todas' });
    }
  };

  return (
    <div
      className="card"
      style={{
        padding: '16px',
        marginBottom: '20px',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        backgroundColor: '#ffffff'
      }}
    >
      <h4 style={{ marginTop: 0, marginBottom: '12px', color: '#006699' }}>
        🔍 Filtrar Inventario de Activos
      </h4>

      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: '12px',
          alignItems: 'end'
        }}
      >
        <div>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
            Buscar por Código o Nombre:
          </label>
          <input
            type="text"
            placeholder="Ej. ACT-001 o Horno Industrial"
            value={busqueda}
            onChange={manejarBusqueda}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
            Estado:
          </label>
          <select
            value={estado}
            onChange={manejarEstado}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          >
            <option value="Todos">Todos</option>
            <option value="Operativo">Operativo</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Crítico">Crítico</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
            Categoría:
          </label>
          <select
            value={categoria}
            onChange={manejarCategoria}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          >
            <option value="Todas">Todas</option>
            <option value="Cocina">Cocina</option>
            <option value="Barra">Barra</option>
            <option value="Refrigeración">Refrigeración</option>
            <option value="Panadería">Panadería</option>
          </select>
        </div>

        <div>
          <button
            type="button"
            onClick={manejarLimpiar}
            style={{
              width: '100%',
              padding: '9px 12px',
              backgroundColor: '#6c757d',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Limpiar Filtros
          </button>
        </div>
      </form>
    </div>
  );
}

export default ActivoFilters;