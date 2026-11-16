import { useState } from 'react';
import { ROLES } from '../../data/mockData.js';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';

const FORM_INICIAL = {
  nombre: '',
  email: '',
  password: '',
  rol: 'Operario',
  cargo: '',
  telefono: '',
  ubicacion: '',
  estado: 'Activo',
};

function datosDeUsuario(usuario) {
  return {
    nombre: usuario?.nombre ?? '',
    email: usuario?.email ?? '',
    password: '',
    rol: usuario?.rol ?? 'Operario',
    cargo: usuario?.cargo ?? '',
    telefono: usuario?.telefono ?? '',
    ubicacion: usuario?.ubicacion ?? '',
    estado: usuario?.estado ?? 'Activo',
  };
}

export default function UsuarioForm({
  usuarios = [],
  usuario = null,
  onSubmit,
  onCancel,
}) {
  const editando = Boolean(usuario);
  const [form, setForm] = useState(() => datosDeUsuario(usuario));
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: '' }));
    setErrorGeneral('');
  }

  function validar() {
    const nuevos = {};

    if (!form.nombre.trim()) nuevos.nombre = 'Escribe el nombre completo.';
    if (!form.email.trim()) {
      nuevos.email = 'Escribe el correo electrónico.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nuevos.email = 'El correo no tiene un formato válido.';
    } else if (
      usuarios.some(
        (item) =>
          item.id !== usuario?.id &&
          item.email.toLowerCase() === form.email.trim().toLowerCase(),
      )
    ) {
      nuevos.email = 'Ya existe un usuario con este correo.';
    }

    if (!editando && form.password.length < 6) {
      nuevos.password = 'La contraseña debe tener al menos 6 caracteres.';
    }
    if (editando && form.password && form.password.length < 6) {
      nuevos.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    if (!form.rol) nuevos.rol = 'Selecciona un rol.';

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
      nombre: form.nombre.trim(),
      email: form.email.trim().toLowerCase(),
      cargo: form.cargo.trim(),
      telefono: form.telefono.trim(),
      ubicacion: form.ubicacion.trim(),
    };

    if (editando && !datos.password) {
      delete datos.password;
    }

    onSubmit?.(datos);
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit} noValidate>
      {errorGeneral ? (
        <div className="form-alert field--full" role="alert">
          {errorGeneral}
        </div>
      ) : null}

      <Input
        label="Nombre completo"
        name="nombre"
        placeholder="Nombre y apellidos"
        value={form.nombre}
        onChange={handleChange}
        error={errores.nombre}
      />
      <Input
        label="Correo electrónico"
        name="email"
        type="email"
        placeholder="usuario@siga.com"
        value={form.email}
        onChange={handleChange}
        error={errores.email}
      />
      <Input
        label={editando ? 'Nueva contraseña' : 'Contraseña'}
        name="password"
        type="password"
        placeholder="Mínimo 6 caracteres"
        help={editando ? 'Déjala vacía para conservar la actual.' : ''}
        value={form.password}
        onChange={handleChange}
        error={errores.password}
      />
      <Select
        label="Rol"
        name="rol"
        options={ROLES}
        value={form.rol}
        onChange={handleChange}
        error={errores.rol}
      />
      <Input
        label="Cargo"
        name="cargo"
        placeholder="Aprendiz ADSO, técnico..."
        value={form.cargo}
        onChange={handleChange}
      />
      <Input
        label="Teléfono"
        name="telefono"
        placeholder="300 000 0000"
        value={form.telefono}
        onChange={handleChange}
      />
      <Input
        label="Ubicación"
        name="ubicacion"
        placeholder="Oficina, almacén, cocina..."
        value={form.ubicacion}
        onChange={handleChange}
      />
      <Select
        label="Estado"
        name="estado"
        options={['Activo', 'Inactivo']}
        value={form.estado}
        onChange={handleChange}
      />

      <div className="form-actions field--full">
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {editando ? 'Guardar cambios' : 'Crear usuario'}
        </Button>
      </div>
    </form>
  );
}
