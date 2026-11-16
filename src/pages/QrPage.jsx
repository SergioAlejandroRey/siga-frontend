import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSiga } from '../context/SigaContext.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import Icon from '../components/common/Icon.jsx';
import { formatDate } from '../utils/format.js';
import { tonoEstado } from '../utils/status.js';

function Dato({ etiqueta, children }) {
  return (
    <>
      <dt>{etiqueta}</dt>
      <dd>{children || '—'}</dd>
    </>
  );
}

/**
 * Consulta de activos por código QR o código interno.
 */
export default function QrPage() {
  const { activos } = useSiga();
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState('');
  const [consulta, setConsulta] = useState('');

  const activo = useMemo(() => {
    const termino = consulta.trim().toLowerCase();
    if (!termino) return null;

    return (
      activos.find((item) =>
        [item.codigo, item.codigoQr]
          .filter(Boolean)
          .some((valor) => String(valor).toLowerCase() === termino),
      ) ?? null
    );
  }, [activos, consulta]);

  const buscado = consulta.trim().length > 0;

  function handleSubmit(event) {
    event.preventDefault();
    setConsulta(codigo.trim());
  }

  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <span className="eyebrow">Inventario</span>
          <h2>Buscar activo por QR</h2>
          <p>
            Escanea la etiqueta del activo o escribe su código QR o código
            interno para consultar la ficha.
          </p>
        </div>
      </section>

      <section className="card">
        <form className="search-row" onSubmit={handleSubmit}>
          <Input
            label="Código"
            name="codigo-qr"
            placeholder="QR-ACT-001 o ACT-001"
            value={codigo}
            onChange={(event) => setCodigo(event.target.value)}
          />
          <Button type="submit" icon={<Icon name="search" size={16} />}>
            Buscar
          </Button>
        </form>

        {buscado && !activo ? (
          <div className="form-alert" role="alert">
            <Icon name="alert" size={16} />
            <span>No se encontró un activo con ese código.</span>
          </div>
        ) : null}

        {activo ? (
          <div className="result-card">
            <div className="card__header">
              <div>
                <h3>{activo.nombre}</h3>
                <p>
                  {activo.codigo} · {activo.codigoQr || 'Sin código QR'}
                </p>
              </div>
              <Badge tone={tonoEstado(activo.estado)}>{activo.estado}</Badge>
            </div>

            <dl className="detail-grid">
              <Dato etiqueta="Categoría">{activo.categoria}</Dato>
              <Dato etiqueta="Marca">{activo.marca}</Dato>
              <Dato etiqueta="Modelo">{activo.modelo}</Dato>
              <Dato etiqueta="Serie">{activo.serie}</Dato>
              <Dato etiqueta="Ubicación">{activo.ubicacion}</Dato>
              <Dato etiqueta="Responsable">{activo.responsable}</Dato>
              <Dato etiqueta="Fecha de compra">
                {formatDate(activo.fechaCompra)}
              </Dato>
              <Dato etiqueta="Estado">{activo.estado}</Dato>
            </dl>

            <div className="form-actions">
              <Button
                variant="secondary"
                onClick={() => navigate(`/activos/${activo.id}`)}
              >
                Ver ficha completa
              </Button>
              {activo.estado === 'Disponible' ? (
                <Button
                  icon={<Icon name="swap" size={16} />}
                  onClick={() => navigate(`/prestamos?activo=${activo.id}`)}
                >
                  Registrar préstamo
                </Button>
              ) : null}
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
