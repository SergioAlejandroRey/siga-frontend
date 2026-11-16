/**
 * QrPage — pieza pendiente de Veronica.
 *
 * Sin props. Cuando se suba la implementación de la guía, buscará activos por
 * código interno o código QR usando useSiga().
 *
 * Marcador temporal para que la aplicación compile y la ruta /qr responda.
 */
import Badge from '../components/ui/Badge.jsx';
import Icon from '../components/common/Icon.jsx';

export default function QrPage() {
  return (
    <section className="pending-slot pending-slot--page">
      <div className="pending-slot__head">
        <div>
          <strong>QrPage</strong>
          <p>Consulta de activos por código QR o código interno.</p>
        </div>
        <Badge tone="amber">Pendiente</Badge>
      </div>
      <div className="pending-slot__qr">
        <Icon name="qr" size={64} />
        <p>
          La búsqueda por QR se activará cuando se suba este componente.
        </p>
      </div>
    </section>
  );
}
