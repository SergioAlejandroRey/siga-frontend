/**
 * Estado vacío para tablas y listados sin resultados.
 */
export default function EmptyState({
  title = 'Sin datos',
  message = 'No hay información para mostrar.',
  icon = '📭',
  action = null,
}) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon" aria-hidden="true">
        {icon}
      </span>
      <h3>{title}</h3>
      <p>{message}</p>
      {action ? <div className="empty-state__action">{action}</div> : null}
    </div>
  );
}
