import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { ESTADOS_ACTIVO } from '../../data/mockData.js';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';
import Badge from '../ui/Badge.jsx';
import EmptyState from '../ui/EmptyState.jsx';
import { formatDate, hoyISO } from '../../utils/format.js';
import { tonoEstado } from '../../utils/status.js';

export default function DevolucionForm({
  prestamos = [],
  initialPrestamoId = '',
  onSubmit,
  onCancel,
}) {
  const { user } = useAuth();
  const pendientes = prestamos.filter(
    (prestamo) => prestamo.estado === 'Activo' || prestamo.estado === 'Vencido',
  );

  const [form, setForm] = useState({
    prestamoId: pendientes.some((item) => item.id === initialPrestamoId)
      ? initialPrestamoId
      : '',
    fechaDevolucion: hoyISO(),
    estadoActivo: 'Disponible',
    recibidoPor: user?.nombre || '',
    observaciones: '',
  });
  const [error, setError] = useState('');
  const seleccionado = pendientes.find((item) => item.id === form.prestamoId);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.prestamoId || !form.fechaDevolucion || !form.recibidoPor.trim()) {
      setError('Selecciona el préstamo, la fecha y quién recibe el activo.');
      return;
    }

    onSubmit?.({
      ...form,
      recibidoPor: form.recibidoPor.trim(),
      observaciones: form.observaciones.trim(),
    });
  }

  if (!pendientes.length) {
    return (
      <EmptyState
        icon="✅"
        title="Sin préstamos pendientes"
        message="Todos los préstamos ya fueron devueltos."
        action={
          <Button variant="secondary" onClick={onCancel}>
            Cerrar
          </Button>
        }
      />
    );
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit} noValidate>
      {error ? (
        <div className="form-alert field--full" role="alert">
          {error}
        </div>
      ) : null}

      <Select
        label="Préstamo a devolver"
        name="prestamoId"
        className="field--full"
        placeholder="Selecciona un préstamo"
        options={pendientes.map((prestamo) => ({
          value: prestamo.id,
          label: `${prestamo.codigo} — ${prestamo.activoNombre} · ${prestamo.solicitante}`,
        }))}
        value={form.prestamoId}
        onChange={handleChange}
      />

      {seleccionado ? (
        <div className="selected-summary field--full">
          <div>
            <strong>{seleccionado.activoNombre}</strong>
            <span>
              {seleccionado.activoCodigo} · {seleccionado.solicitante}
            </span>
          </div>
          <div className="selected-summary__right">
            <Badge tone={tonoEstado(seleccionado.estado)}>
              {seleccionado.estado}
            </Badge>
            <span>Vence: {formatDate(seleccionado.fechaDevolucion)}</span>
          </div>
        </div>
      ) : null}

      <Input
        label="Fecha de devolución"
        name="fechaDevolucion"
        type="date"
        value={form.fechaDevolucion}
        onChange={handleChange}
      />

      <Select
        label="Estado en que regresa"
        name="estadoActivo"
        options={ESTADOS_ACTIVO.filter((estado) => estado !== 'Prestado')}
        value={form.estadoActivo}
        onChange={handleChange}
      />

      <Input
        label="Recibido por"
        name="recibidoPor"
        value={form.recibidoPor}
        onChange={handleChange}
        className="field--full"
      />

      <div className="field field--full">
        <label htmlFor="field-observaciones-devolucion">Observaciones</label>
        <textarea
          id="field-observaciones-devolucion"
          name="observaciones"
          rows="3"
          placeholder="Estado del equipo, accesorios, novedades..."
          value={form.observaciones}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions field--full">
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Registrar devolución</Button>
      </div>
    </form>
  );
}
