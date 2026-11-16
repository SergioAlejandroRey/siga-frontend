import { useState } from 'react';
import { PRIORIDADES } from '../../data/mockData.js';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';
import { hoyISO } from '../../utils/format.js';

const TIPOS = ['Preventivo', 'Correctivo'];

export default function OrdenForm({ activos = [], tecnicos = [], onSubmit, onCancel }) {
  const [form, setForm] = useState({
    activoId: '',
    tipo: 'Correctivo',
    descripcion: '',
    tecnico: tecnicos[0]?.nombre || '',
    fecha: hoyISO(),
    prioridad: 'Media',
  });
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.activoId || !form.descripcion.trim() || !form.tecnico) {
      setError('Selecciona el activo, el técnico y describe el trabajo.');
      return;
    }

    const activo = activos.find((item) => item.id === form.activoId);
    onSubmit?.({
      ...form,
      descripcion: form.descripcion.trim(),
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
        label="Activo"
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
        label="Tipo de mantenimiento"
        name="tipo"
        options={TIPOS}
        value={form.tipo}
        onChange={handleChange}
      />

      <Select
        label="Prioridad"
        name="prioridad"
        options={PRIORIDADES}
        value={form.prioridad}
        onChange={handleChange}
      />

      <Select
        label="Técnico asignado"
        name="tecnico"
        placeholder={tecnicos.length ? 'Selecciona un técnico' : 'No hay técnicos activos'}
        options={tecnicos.map((tecnico) => ({
          value: tecnico.nombre,
          label: tecnico.nombre,
        }))}
        value={form.tecnico}
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
        <label htmlFor="field-descripcion-orden">Descripción del trabajo</label>
        <textarea
          id="field-descripcion-orden"
          name="descripcion"
          rows="4"
          placeholder="Describe la falla o el mantenimiento solicitado."
          value={form.descripcion}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions field--full">
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Crear orden</Button>
      </div>
    </form>
  );
}
