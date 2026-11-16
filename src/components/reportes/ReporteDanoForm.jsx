import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { PRIORIDADES } from '../../data/mockData.js';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';
import { hoyISO } from '../../utils/format.js';

export default function ReporteDanoForm({ activos = [], onSubmit, onCancel }) {
  const { user } = useAuth();
  const [form, setForm] = useState({
    activoId: '',
    descripcion: '',
    prioridad: 'Media',
    reportadoPor: user?.nombre || '',
    fecha: hoyISO(),
  });
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.activoId || !form.descripcion.trim() || !form.reportadoPor.trim()) {
      setError('Selecciona el activo, describe el daño y registra quién lo reporta.');
      return;
    }

    const activo = activos.find((item) => item.id === form.activoId);
    onSubmit?.({
      ...form,
      descripcion: form.descripcion.trim(),
      reportadoPor: form.reportadoPor.trim(),
      activoNombre: activo?.nombre ?? '',
      activoCodigo: activo?.codigo ?? '',
    });
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit} noValidate>
      {error ? (
        <div className="form-alert field--full" role="alert">
          {error}
        </div>
      ) : null}

      <Select
        label="Activo afectado"
        name="activoId"
        className="field--full"
        placeholder="Selecciona un activo"
        options={activos.map((activo) => ({
          value: activo.id,
          label: `${activo.codigo} — ${activo.nombre}`,
        }))}
        value={form.activoId}
        onChange={handleChange}
      />

      <Select
        label="Prioridad"
        name="prioridad"
        options={PRIORIDADES}
        value={form.prioridad}
        onChange={handleChange}
      />

      <Input
        label="Reportado por"
        name="reportadoPor"
        value={form.reportadoPor}
        onChange={handleChange}
      />

      <Input
        label="Fecha"
        name="fecha"
        type="date"
        value={form.fecha}
        onChange={handleChange}
      />

      <div className="field field--full">
        <label htmlFor="field-descripcion-reporte">Descripción del daño</label>
        <textarea
          id="field-descripcion-reporte"
          name="descripcion"
          rows="4"
          placeholder="Explica qué ocurrió y qué parte del activo está afectada."
          value={form.descripcion}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions field--full">
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Registrar reporte</Button>
      </div>
    </form>
  );
}
