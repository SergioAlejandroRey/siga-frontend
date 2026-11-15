import Icon from '../common/Icon.jsx';

const TARJETAS = [
  {
    clave: 'totalActivos',
    etiqueta: 'Activos registrados',
    icono: 'box',
    tono: 'blue',
    pista: 'Inventario total',
  },
  {
    clave: 'disponibles',
    etiqueta: 'Disponibles',
    icono: 'check',
    tono: 'green',
    pista: 'Listos para prestar',
  },
  {
    clave: 'prestados',
    etiqueta: 'Prestados',
    icono: 'swap',
    tono: 'amber',
    pista: 'Fuera del almacén',
  },
  {
    clave: 'mantenimiento',
    etiqueta: 'En mantenimiento',
    icono: 'wrench',
    tono: 'red',
    pista: 'Requieren revisión',
  },
];

export default function StatsGrid({ totales = {}, cargando = false }) {
  if (cargando) {
    return (
      <div className="stats-grid" aria-busy="true">
        {TARJETAS.map((tarjeta) => (
          <div className="stat-card stat-card--skeleton" key={tarjeta.clave}>
            <span className="skeleton skeleton--icon" />
            <span className="skeleton skeleton--value" />
            <span className="skeleton skeleton--label" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="stats-grid">
      {TARJETAS.map((tarjeta) => (
        <article
          className={`stat-card stat-card--${tarjeta.tono}`}
          key={tarjeta.clave}
        >
          <div className="stat-card__top">
            <span className="stat-card__icon">
              <Icon name={tarjeta.icono} size={20} />
            </span>
            <span className="stat-card__hint">{tarjeta.pista}</span>
          </div>
          <strong className="stat-card__value">
            {totales[tarjeta.clave] ?? 0}
          </strong>
          <span className="stat-card__label">{tarjeta.etiqueta}</span>
        </article>
      ))}
    </div>
  );
}
