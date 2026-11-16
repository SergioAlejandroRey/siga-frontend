import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useSiga } from '../context/SigaContext.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import Icon from '../components/common/Icon.jsx';
import { inicialesDe } from '../utils/format.js';
import { tonoRol } from '../utils/status.js';

export default function PerfilPage() {
  const { user, updateSession } = useAuth();
  const { usuarios, updateUsuario } = useSiga();
  const [perfil, setPerfil] = useState({
    nombre: user?.nombre ?? '',
    email: user?.email ?? '',
    cargo: user?.cargo ?? '',
    telefono: user?.telefono ?? '',
    ubicacion: user?.ubicacion ?? '',
  });
  const [pass, setPass] = useState({
    actual: '',
    nueva: '',
    confirmar: '',
  });
  const [avisoPerfil, setAvisoPerfil] = useState('');
  const [errorPerfil, setErrorPerfil] = useState('');
  const [avisoPass, setAvisoPass] = useState('');
  const [errorPass, setErrorPass] = useState('');

  if (!user) {
    return (
      <EmptyState
        icon="🔒"
        title="Sesión no disponible"
        message="Vuelve a iniciar sesión para ver tu perfil."
      />
    );
  }

  const registro = usuarios.find((item) => item.id === user.id);

  function handlePerfilChange(event) {
    const { name, value } = event.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
    setErrorPerfil('');
    setAvisoPerfil('');
  }

  function guardarPerfil(event) {
    event.preventDefault();
    setErrorPerfil('');
    setAvisoPerfil('');

    if (!perfil.nombre.trim() || !perfil.email.trim()) {
      setErrorPerfil('El nombre y el correo son obligatorios.');
      return;
    }

    if (
      usuarios.some(
        (item) =>
          item.id !== user.id &&
          item.email.toLowerCase() === perfil.email.trim().toLowerCase(),
      )
    ) {
      setErrorPerfil('Ese correo ya está registrado por otro usuario.');
      return;
    }

    const datos = {
      nombre: perfil.nombre.trim(),
      email: perfil.email.trim().toLowerCase(),
      cargo: perfil.cargo.trim(),
      telefono: perfil.telefono.trim(),
      ubicacion: perfil.ubicacion.trim(),
      iniciales: inicialesDe(perfil.nombre),
    };

    updateUsuario(user.id, datos);
    updateSession(datos);
    setAvisoPerfil('Datos actualizados correctamente.');
  }

  function handlePassChange(event) {
    const { name, value } = event.target;
    setPass((prev) => ({ ...prev, [name]: value }));
    setErrorPass('');
    setAvisoPass('');
  }

  function cambiarPassword(event) {
    event.preventDefault();
    setErrorPass('');
    setAvisoPass('');

    if (!pass.actual || !pass.nueva || !pass.confirmar) {
      setErrorPass('Completa los tres campos.');
      return;
    }
    if (registro && registro.password !== pass.actual) {
      setErrorPass('La contraseña actual no es correcta.');
      return;
    }
    if (pass.nueva.length < 6) {
      setErrorPass('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (pass.nueva !== pass.confirmar) {
      setErrorPass('La nueva contraseña y su confirmación no coinciden.');
      return;
    }

    updateUsuario(user.id, { password: pass.nueva });
    setPass({ actual: '', nueva: '', confirmar: '' });
    setAvisoPass('Contraseña actualizada correctamente.');
  }

  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <span className="eyebrow">Cuenta</span>
          <h2>Mi perfil</h2>
          <p>
            Actualiza tus datos de contacto y la contraseña de acceso.
          </p>
        </div>
      </section>

      <div className="profile-layout">
        <aside className="card profile-card">
          <span className="avatar avatar--xl">{user.iniciales || 'SR'}</span>
          <h3>{user.nombre}</h3>
          <p>{user.email}</p>
          <Badge tone={tonoRol(user.rol)}>{user.rol}</Badge>
          <dl className="profile-meta">
            <div>
              <dt>Cargo</dt>
              <dd>{user.cargo || '—'}</dd>
            </div>
            <div>
              <dt>Ubicación</dt>
              <dd>{user.ubicacion || '—'}</dd>
            </div>
            <div>
              <dt>Estado</dt>
              <dd>{user.estado || 'Activo'}</dd>
            </div>
          </dl>
        </aside>

        <div className="profile-forms">
          <section className="card">
            <div className="card__header">
              <div>
                <h3>Datos personales</h3>
                <p>Esta información se muestra en el menú y en los registros.</p>
              </div>
            </div>

            <form className="form-grid" onSubmit={guardarPerfil} noValidate>
              {errorPerfil ? (
                <div className="form-alert field--full" role="alert">
                  {errorPerfil}
                </div>
              ) : null}
              {avisoPerfil ? (
                <div className="form-alert form-alert--success field--full" role="status">
                  <Icon name="check" size={16} />
                  <span>{avisoPerfil}</span>
                </div>
              ) : null}

              <Input
                label="Nombre completo"
                name="nombre"
                value={perfil.nombre}
                onChange={handlePerfilChange}
              />
              <Input
                label="Correo electrónico"
                name="email"
                type="email"
                value={perfil.email}
                onChange={handlePerfilChange}
              />
              <Input
                label="Cargo"
                name="cargo"
                value={perfil.cargo}
                onChange={handlePerfilChange}
              />
              <Input
                label="Teléfono"
                name="telefono"
                value={perfil.telefono}
                onChange={handlePerfilChange}
              />
              <Input
                label="Ubicación"
                name="ubicacion"
                className="field--full"
                value={perfil.ubicacion}
                onChange={handlePerfilChange}
              />

              <div className="form-actions field--full">
                <Button type="submit">Guardar datos</Button>
              </div>
            </form>
          </section>

          <section className="card">
            <div className="card__header">
              <div>
                <h3>Seguridad</h3>
                <p>Cambia la contraseña con la que ingresas al sistema.</p>
              </div>
            </div>

            <form className="form-grid" onSubmit={cambiarPassword} noValidate>
              {errorPass ? (
                <div className="form-alert field--full" role="alert">
                  {errorPass}
                </div>
              ) : null}
              {avisoPass ? (
                <div className="form-alert form-alert--success field--full" role="status">
                  <Icon name="check" size={16} />
                  <span>{avisoPass}</span>
                </div>
              ) : null}

              <Input
                label="Contraseña actual"
                name="actual"
                type="password"
                value={pass.actual}
                onChange={handlePassChange}
                className="field--full"
              />
              <Input
                label="Nueva contraseña"
                name="nueva"
                type="password"
                value={pass.nueva}
                onChange={handlePassChange}
              />
              <Input
                label="Confirmar nueva contraseña"
                name="confirmar"
                type="password"
                value={pass.confirmar}
                onChange={handlePassChange}
              />

              <div className="form-actions field--full">
                <Button type="submit" variant="secondary">
                  Cambiar contraseña
                </Button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
