import Loader from './Loader';
import EmptyState from './EmptyState';

/**
 * Tabla configurable por columnas.
 *
 * columnas: [{ clave, titulo, render? }]
 * datos: array de registros
 * cargando / error: estados de la consulta
 * emptyTitle / emptyMessage / emptyAction: estado sin datos
 */
export default function Table({
  columnas = [],
  datos = [],
  cargando = false,
  error = '',
  emptyTitle = 'Sin registros',
  emptyMessage = 'No hay información para mostrar.',
  emptyAction = null,
  className = '',
}) {
  if (cargando) {
    return (
      <div className="table-state">
        <Loader label="Cargando datos..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="table-state table-state--error" role="alert">
        {error}
      </div>
    );
  }

  if (!datos.length) {
    return (
      <div className="table-state">
        <EmptyState
          title={emptyTitle}
          message={emptyMessage}
          action={emptyAction}
        />
      </div>
    );
  }

  return (
    <div className={`table-wrap ${className}`.trim()}>
      <table className="data-table">
        <thead>
          <tr>
            {columnas.map((columna) => (
              <th key={columna.clave} scope="col">
                {columna.titulo}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map((fila, indice) => (
            <tr key={fila.id ?? indice}>
              {columnas.map((columna) => (
                <td key={columna.clave}>
                  {columna.render
                    ? columna.render(fila)
                    : fila[columna.clave]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
