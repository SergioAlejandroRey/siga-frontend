import { useState } from 'react';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';
import Icon from '../common/Icon.jsx';
import { hoyISO } from '../../utils/format.js';

function fechaEnDias(dias) {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + dias);
  const local = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function formInicial() {
  return {
    activoId: '',
    solicitante: '',
    fechaPrestamo: hoyISO(),
    fechaDevolucion: fechaEnDias(7),
    observaciones: '',
  };
}

/**
 * Formulario para registrar un préstamo.
 *
 * Contrato con PrestamosPage:
 *   activos  catálogo completo de activos
 *   onSubmit recibe los datos del préstamo
 *   onCancel cierra el modal
 */
export default function PrestamoForm({
  activos = [],
  activoInicial = '',
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState(() => ({
    ...formInicial(),
    activoId: activoInicial,
  }));
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

  const disponibles = activos.filter((activo) => activo.estado === 'Disponible');
  const opciones = disponibles.map((activo) => ({
    value: activo.id,
    label: `${activo.codigo} · ${activo.nombre}`,
  }));

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: '' }));
    setErrorGeneral('');
  }

  function validar() {
    const nuevos = {};

    if (!form.activoId) {
      nuevos.activoId = 'Selecciona el activo que se va a prestar.';
    }
    if (!form.solicitante.trim()) {
      nuevos.solicitante = 'Escribe el nombre del solicitante.';
    }
    if (!form.fechaPrestamo) {
      nuevos.fechaPrestamo = 'Selecciona la fecha de préstamo.';
    }
    if (!form.fechaDevolucion) {
      nuevos.fechaDevolucion = 'Selecciona la fecha de devolución.';
    } else if (
      form.fechaPrestamo &&
      form.fechaDevolucion < form.fechaPrestamo
    ) {
      nuevos.fechaDevolucion =
        'La devolución no puede ser anterior al préstamo.';
    }

    setErrores(nuevos);
    return Object.keys(nuevos).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setErrorGeneral('');

    if (!validar()) {
      setErrorGeneral('Revisa los campos marcados antes de guardar.');
      return;
    }

    onSubmit?.({
      activoId: form.activoId,
      solicitante: form.solicitante.trim(),
      fechaPrestamo: form.fechaPrestamo,
      fechaDevolucion: form.fechaDevolucion,
      observaciones: form.observaciones.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {errorGeneral ? (
        <div className="form-alert" role="alert">
          <Icon name="alert" size={16} />
          <span>{errorGeneral}</span>
        </div>
      ) : null}

      {!disponibles.length ? (
        <div className="form-alert" role="status">
          <Icon name="alert" size={16} />
          <span>
            No hay activos disponibles para prestar. Registra un activo o
            espera una devolución.
          </span>
        </div>
      ) : null}

      <div className="form-grid">
        <Select
          label="Activo disponible"
          name="activoId"
          placeholder="Selecciona un activo"
          options={opciones}
          value={form.activoId}
          onChange={handleChange}
          error={errores.activoId}
          help={
            disponibles.length
              ? `${disponibles.length} activo(s) disponible(s).`
              : 'Sin activos disponibles.'
          }
        />

        <Input
          label="Solicitante"
          name="solicitante"
          placeholder="Nombre de quien recibe el activo"
          value={form.solicitante}
          onChange={handleChange}
          error={errores.solicitante}
        />

        <Input
          label="Fecha de préstamo"
          name="fechaPrestamo"
          type="date"
          value={form.fechaPrestamo}
          onChange={handleChange}
          error={errores.fechaPrestamo}
        />

        <Input
          label="Fecha de devolución"
          name="fechaDevolucion"
          type="date"
          value={form.fechaDevolucion}
          onChange={handleChange}
          error={errores.fechaDevolucion}
        />

        <div className="field field--full">
          <label htmlFor="field-observaciones-prestamo">Observaciones</label>
          <textarea
            id="field-observaciones-prestamo"
            name="observaciones"
            rows="3"
            placeholder="Motivo del préstamo, accesorios entregados u otras notas."
            value={form.observaciones}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-actions">
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          type="submit"
          icon={<Icon name="check" size={16} />}
          disabled={!disponibles.length}
        >
          Registrar préstamo
        </Button>
      </div>
    </form>
  );
}
