import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSiga } from '../../context/SigaContext.jsx';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import EmptyState from '../ui/EmptyState.jsx';
import Icon from '../common/Icon.jsx';
import { formatCurrency, formatDate } from '../../utils/format.js';
import { tonoEstado } from '../../utils/status.js';

function Dato({ etiqueta, children }) {
  return (
    <>
      <dt>{etiqueta}</dt>
      <dd>{children || '—'}</dd>
    </>
  );
}

export default function ActivoDetail() {
  const { id } = useParams();
  const { activos, prestamos, ordenes, reportes } = useSiga();
  const navigate = useNavigate();
  const [copiado, setCopiado] = useState(false);
  const activo = activos.find((item) => item.id === id);

  if (!activo) {
    return (
      <EmptyState
        icon="🔎"
        title="Activo no encontrado"
        message="El activo que buscas no existe o fue eliminado del inventario."
        action={
          <Button variant="secondary" onClick={() => navigate('/activos')}>
            Volver al inventario
          </Button>
        }
      />
    );
  }

  const prestamosActivo = prestamos.filter((item) => item.activoId === activo.id);
  const ordenesActivo = ordenes.filter((item) => item.activoId === activo.id);
  const reportesActivo = reportes.filter((item) => item.activoId === activo.id);

  async function copiarCodigo() {
    try {
      await navigator.clipboard.writeText(activo.codigoQr || activo.codigo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1800);
    } catch {
      setCopiado(false);
    }
  }

  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <span className="eyebrow">{activo.codigo}</span>
          <h2>{activo.nombre}</h2>
          <p>
            {activo.categoria} · {activo.marca} {activo.modelo}
          </p>
        </div>
        <div className="page-hero__actions">
          <Button variant="secondary" onClick={() => navigate('/activos')}>
            Volver
          </Button>
          <Button
            variant="secondary"
            icon={<Icon name="edit" size={16} />}
            onClick={() => navigate(`/activos/${activo.id}/editar`)}
          >
            Editar
          </Button>
          <Button
            icon={<Icon name="swap" size={16} />}
            onClick={() => navigate('/prestamos')}
          >
            Prestar
          </Button>
        </div>
      </section>

      <div className="detail-layout">
        <section className="card">
          <div className="card__header">
            <div>
              <h3>Ficha del activo</h3>
              <p>Información registrada en el inventario.</p>
            </div>
            <Badge tone={tonoEstado(activo.estado)}>{activo.estado}</Badge>
          </div>

          <dl className="detail-grid">
            <Dato etiqueta="Código">{activo.codigo}</Dato>
            <Dato etiqueta="Código QR">{activo.codigoQr}</Dato>
            <Dato etiqueta="Categoría">{activo.categoria}</Dato>
            <Dato etiqueta="Marca">{activo.marca}</Dato>
            <Dato etiqueta="Modelo">{activo.modelo}</Dato>
            <Dato etiqueta="Serie">{activo.serie}</Dato>
            <Dato etiqueta="Ubicación">{activo.ubicacion}</Dato>
            <Dato etiqueta="Responsable">{activo.responsable}</Dato>
            <Dato etiqueta="Valor">{formatCurrency(activo.valor)}</Dato>
            <Dato etiqueta="Vida útil">{activo.vidaUtil} años</Dato>
            <Dato etiqueta="Fecha de compra">{formatDate(activo.fechaCompra)}</Dato>
            <Dato etiqueta="Estado">{activo.estado}</Dato>
          </dl>

          <div className="detail-description">
            <h4>Descripción</h4>
            <p>{activo.descripcion || 'Sin descripción registrada.'}</p>
          </div>
        </section>

        <aside className="detail-side">
          <section className="card qr-card">
            <div className="card__header">
              <div>
                <h3>Código QR</h3>
                <p>Identificador para consulta rápida.</p>
              </div>
            </div>
            <div className="qr-box" aria-label="Código QR del activo">
              <Icon name="qr" size={56} />
            </div>
            <code className="qr-code">{activo.codigoQr || activo.codigo}</code>
            <Button variant="secondary" size="sm" onClick={copiarCodigo}>
              {copiado ? 'Copiado' : 'Copiar código'}
            </Button>
            <p className="muted qr-note">
              También puedes buscarlo en <strong>Consultar QR</strong> usando el
              código interno.
            </p>
          </section>

          <section className="card">
            <div className="card__header">
              <div>
                <h3>Trazabilidad</h3>
                <p>Movimientos asociados a este activo.</p>
              </div>
            </div>
            <ul className="trace-list">
              <li>
                <span>Préstamos</span>
                <strong>{prestamosActivo.length}</strong>
              </li>
              <li>
                <span>Órdenes de trabajo</span>
                <strong>{ordenesActivo.length}</strong>
              </li>
              <li>
                <span>Reportes de daño</span>
                <strong>{reportesActivo.length}</strong>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
