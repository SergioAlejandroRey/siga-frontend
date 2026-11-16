import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSiga } from '../../context/SigaContext.jsx';
import { CATEGORIAS_ACTIVO, ESTADOS_ACTIVO } from '../../data/mockData.js';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';
import EmptyState from '../ui/EmptyState.jsx';
import Icon from '../common/Icon.jsx';
import { hoyISO } from '../../utils/format.js';

const FORM_INICIAL = {
  codigo: '',
  nombre: '',
  categoria: '',
  marca: '',
  modelo: '',
  serie: '',
  estado: 'Disponible',
  responsable: '',
  ubicacion: '',
  valor: '',
  vidaUtil: '',
  fechaCompra: hoyISO(),
  descripcion: '',
};

function datosDeActivo(activo) {
  return {
    codigo: activo.codigo ?? '',
    nombre: activo.nombre ?? '',
    categoria: activo.categoria ?? '',
    marca: activo.marca ?? '',
    modelo: activo.modelo ?? '',
    serie: activo.serie ?? '',
    estado: activo.estado ?? 'Disponible',
    responsable: activo.responsable ?? '',
    ubicacion: activo.ubicacion ?? '',
    valor: activo.valor != null ? String(activo.valor) : '',
    vidaUtil: activo.vidaUtil != null ? String(activo.vidaUtil) : '',
    fechaCompra: activo.fechaCompra ?? hoyISO(),
    descripcion: activo.descripcion ?? '',
  };
}

export default function ActivoForm() {
  const { id } = useParams();
  const editando = Boolean(id);
  const { activos, addActivo, updateActivo } = useSiga();
  const navigate = useNavigate();
  const activo = editando ? activos.find((item) => item.id === id) : null;

  const [form, setForm] = useState(() =>
    activo ? datosDeActivo(activo) : FORM_INICIAL,
  );
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

  if (editando && !activo) {
    return (
      <EmptyState
        icon="🔎"
        title="Activo no encontrado"
        message="El activo que intentas editar ya no existe en el inventario."
        action={
          <Button variant="secondary" onClick={() => navigate('/activos')}>
            Volver al inventario
          </Button>
        }
      />
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: '' }));
    setErrorGeneral('');
  }

  function validar() {
    const nuevos = {};

    if (!form.nombre.trim()) nuevos.nombre = 'Escribe el nombre del activo.';
    if (!form.categoria) nuevos.categoria = 'Selecciona una categoría.';
    if (!form.marca.trim()) nuevos.marca = 'Escribe la marca.';
    if (!form.serie.trim()) nuevos.serie = 'Escribe la serie o el identificador.';
    if (!form.ubicacion.trim()) nuevos.ubicacion = 'Indica la ubicación.';
    if (!form.fechaCompra) nuevos.fechaCompra = 'Selecciona la fecha de compra.';
    if (!form.valor || Number(form.valor) <= 0) {
      nuevos.valor = 'Ingresa un valor mayor que cero.';
    }
    if (!form.vidaUtil || Number(form.vidaUtil) <= 0) {
      nuevos.vidaUtil = 'Ingresa una vida útil mayor que cero.';
    }

    const codigo = form.codigo.trim().toLowerCase();
    if (
      codigo &&
      activos.some(
        (item) => item.id !== id && item.codigo.toLowerCase() === codigo,
      )
    ) {
      nuevos.codigo = 'Ya existe un activo con este código.';
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

    const datos = {
      ...form,
      codigo: form.codigo.trim(),
      nombre: form.nombre.trim(),
      marca: form.marca.trim(),
      modelo: form.modelo.trim(),
      serie: form.serie.trim(),
      responsable: form.responsable.trim(),
      ubicacion: form.ubicacion.trim(),
      descripcion: form.descripcion.trim(),
      valor: Number(form.valor),
      vidaUtil: Number(form.vidaUtil),
    };

    if (editando) {
      updateActivo(id, datos);
    } else {
      addActivo(datos);
    }

    navigate('/activos');
  }

  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <span className="eyebrow">{editando ? 'Edición' : 'Registro'}</span>
          <h2>{editando ? 'Editar activo' : 'Nuevo activo'}</h2>
          <p>
            {editando
              ? 'Actualiza los datos del activo y guarda los cambios.'
              : 'Completa la ficha del activo para agregarlo al inventario.'}
          </p>
        </div>
        <div className="page-hero__actions">
          <Button variant="secondary" onClick={() => navigate('/activos')}>
            Volver
          </Button>
        </div>
      </section>

      <form className="card form-card" onSubmit={handleSubmit} noValidate>
        {errorGeneral ? (
          <div className="form-alert" role="alert">
            <Icon name="alert" size={16} />
            <span>{errorGeneral}</span>
          </div>
        ) : null}

        <div className="form-grid">
          <Input
            label="Código"
            name="codigo"
            placeholder="ACT-013"
            help={editando ? 'Código interno del activo.' : 'Si lo dejas vacío se genera automáticamente.'}
            value={form.codigo}
            onChange={handleChange}
            error={errores.codigo}
          />
          <Input
            label="Nombre"
            name="nombre"
            placeholder="Ej. Computador de escritorio"
            value={form.nombre}
            onChange={handleChange}
            error={errores.nombre}
          />
          <Select
            label="Categoría"
            name="categoria"
            placeholder="Selecciona una categoría"
            options={CATEGORIAS_ACTIVO}
            value={form.categoria}
            onChange={handleChange}
            error={errores.categoria}
          />
          <Select
            label="Estado"
            name="estado"
            options={ESTADOS_ACTIVO}
            value={form.estado}
            onChange={handleChange}
          />
          <Input
            label="Marca"
            name="marca"
            placeholder="Lenovo, HP, LG..."
            value={form.marca}
            onChange={handleChange}
            error={errores.marca}
          />
          <Input
            label="Modelo"
            name="modelo"
            placeholder="ThinkCentre M70q"
            value={form.modelo}
            onChange={handleChange}
          />
          <Input
            label="Serie"
            name="serie"
            placeholder="SN-..."
            value={form.serie}
            onChange={handleChange}
            error={errores.serie}
          />
          <Input
            label="Ubicación"
            name="ubicacion"
            placeholder="Oficina, almacén, cocina..."
            value={form.ubicacion}
            onChange={handleChange}
            error={errores.ubicacion}
          />
          <Input
            label="Valor (COP)"
            name="valor"
            type="number"
            min="0"
            step="1000"
            placeholder="2500000"
            value={form.valor}
            onChange={handleChange}
            error={errores.valor}
          />
          <Input
            label="Vida útil (años)"
            name="vidaUtil"
            type="number"
            min="1"
            step="1"
            placeholder="5"
            value={form.vidaUtil}
            onChange={handleChange}
            error={errores.vidaUtil}
          />
          <Input
            label="Fecha de compra"
            name="fechaCompra"
            type="date"
            value={form.fechaCompra}
            onChange={handleChange}
            error={errores.fechaCompra}
          />
          <Input
            label="Responsable"
            name="responsable"
            placeholder="Opcional"
            help="Se asigna automáticamente al registrar un préstamo."
            value={form.responsable}
            onChange={handleChange}
          />

          <div className="field field--full">
            <label htmlFor="field-descripcion">Descripción</label>
            <textarea
              id="field-descripcion"
              name="descripcion"
              rows="4"
              placeholder="Detalles del activo, accesorios incluidos o novedades."
              value={form.descripcion}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <Button variant="secondary" onClick={() => navigate('/activos')}>
            Cancelar
          </Button>
          <Button type="submit" icon={<Icon name="check" size={16} />}>
            {editando ? 'Guardar cambios' : 'Registrar activo'}
          </Button>
        </div>
      </form>
    </div>
  );
}
