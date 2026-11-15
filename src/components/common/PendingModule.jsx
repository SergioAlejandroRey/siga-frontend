import Badge from '../ui/Badge.jsx';
import Icon from '../common/Icon.jsx';

/**
 * Tarjeta de módulo pendiente. Se usa mientras Ángela y Veronica implementan
 * sus módulos. Mantiene la navegación y el diseño funcionando desde el primer día.
 */
export default function PendingModule({
  title,
  owner = 'Equipo',
  description = '',
  components = [],
  route = '',
  compact = false,
}) {
  const tono =
    owner === 'Ángela' ? 'pink' : owner === 'Veronica' ? 'teal' : 'blue';

  if (compact) {
    return (
      <div className="pending-module pending-module--compact">
        <div className="pending-module__compact-head">
          <span className="pending-module__icon">
            <Icon name="wrench" size={20} />
          </span>
          <div>
            <strong>{title}</strong>
            <span>Pendiente · {owner}</span>
          </div>
          <Badge tone={tono}>{owner}</Badge>
        </div>
        <p>{description}</p>
        {components.length ? (
          <div className="pending-module__components">
            {components.map((componente) => (
              <span className="pending-module__chip" key={componente}>
                {componente}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <section className="pending-module">
      <div className="pending-module__header">
        <span className="pending-module__icon">
          <Icon name="wrench" size={24} />
        </span>
        <div className="pending-module__heading">
          <span className="eyebrow">Módulo en desarrollo</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <Badge tone={tono}>{owner}</Badge>
      </div>

      <div className="pending-module__body">
        {route ? (
          <p>
            La ruta <code>{route}</code> ya está conectada y protegida. Falta
            implementar:
          </p>
        ) : (
          <p>Falta implementar:</p>
        )}

        <div className="pending-module__components">
          {components.map((componente) => (
            <span className="pending-module__chip" key={componente}>
              {componente}
            </span>
          ))}
        </div>

        <div className="callout callout--info">
          <strong>Cómo continuar:</strong> usa los componentes compartidos
          (Button, Input, Select, Table, Modal, Badge, Loader, EmptyState) y los
          datos y acciones de <code>useSiga()</code>. No necesitas backend.
        </div>

        <div className="pending-module__footer">
          <span>
            <Icon name="database" size={14} /> Datos mock disponibles en
            SigaContext.
          </span>
          <span>
            <Icon name="shield" size={14} /> Ruta protegida y menú listos.
          </span>
        </div>
      </div>
    </section>
  );
}
