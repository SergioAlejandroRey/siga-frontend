import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useSiga } from '../context/SigaContext.jsx';
import UsuariosTable from '../components/usuarios/UsuariosTable.jsx';
import UsuarioForm from '../components/usuarios/UsuarioForm.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import Select from '../components/ui/Select.jsx';
import Modal from '../components/ui/Modal.jsx';
import Icon from '../components/common/Icon.jsx';
import { ROLES } from '../data/mockData.js';
import { inicialesDe } from '../utils/format.js';

export default function UsuariosPage() {
  const { usuarios, addUsuario, updateUsuario, loading } = useSiga();
  const { user, updateSession } = useAuth();
  const [busqueda, setBusqueda] = useState('');
  const [rol, setRol] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editando, setEditando] = useState(null);
  const [aviso, setAviso] = useState('');

  const filtrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    return usuarios.filter((usuario) => {
      if (rol && usuario.rol !== rol) return false;
      if (!termino) return true;
      return [usuario.nombre, usuario.email, usuario.cargo, usuario.ubicacion]
        .filter(Boolean)
        .some((valor) => String(valor).toLowerCase().includes(termino));
    });
  }, [usuarios, busqueda, rol]);

  function abrirNuevo() {
    setEditando(null);
    setModalAbierto(true);
  }

  function abrirEditar(usuario) {
    setEditando(usuario);
    setModalAbierto(true);
  }

  function cerrarModal() {
    setModalAbierto(false);
    setEditando(null);
  }

  function handleSave(data) {
    const iniciales = inicialesDe(data.nombre);

    if (editando) {
      updateUsuario(editando.id, { ...data, iniciales });

      if (editando.id === user?.id) {
        const { password: _password, ...sesion } = data;
        updateSession({ ...sesion, iniciales });
      }

      setAviso('Usuario actualizado correctamente.');
    } else {
      addUsuario({ ...data, iniciales });
      setAviso('Usuario creado correctamente.');
    }

    cerrarModal();
  }

  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <span className="eyebrow">Administración</span>
          <h2>Usuarios del sistema</h2>
          <p>
            Gestiona las cuentas, los roles y el estado de acceso al SIGA.
          </p>
        </div>
        <div className="page-hero__actions">
          <Button
            icon={<Icon name="plus" size={16} />}
            onClick={abrirNuevo}
          >
            Nuevo usuario
          </Button>
        </div>
      </section>

      {aviso ? (
        <div className="form-alert form-alert--success" role="status">
          <Icon name="check" size={16} />
          <span>{aviso}</span>
          <button
            type="button"
            className="form-alert__close"
            onClick={() => setAviso('')}
            aria-label="Cerrar aviso"
          >
            ×
          </button>
        </div>
      ) : null}

      <div className="stat-chips">
        <div className="stat-chip">
          <span className="stat-chip__icon stat-chip__icon--blue">
            <Icon name="users" size={16} />
          </span>
          <div>
            <strong>{usuarios.length}</strong>
            <span>Usuarios registrados</span>
          </div>
        </div>
        <div className="stat-chip">
          <span className="stat-chip__icon stat-chip__icon--green">
            <Icon name="check" size={16} />
          </span>
          <div>
            <strong>{usuarios.filter((item) => item.estado === 'Activo').length}</strong>
            <span>Activos</span>
          </div>
        </div>
        <div className="stat-chip">
          <span className="stat-chip__icon stat-chip__icon--purple">
            <Icon name="shield" size={16} />
          </span>
          <div>
            <strong>{usuarios.filter((item) => item.rol === 'Administrador').length}</strong>
            <span>Administradores</span>
          </div>
        </div>
      </div>

      <section className="card">
        <div className="filters filters--compact">
          <Input
            label="Buscar"
            name="busqueda-usuario"
            placeholder="Nombre, correo, cargo..."
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
          />
          <Select
            label="Rol"
            name="rol-usuario"
            placeholder="Todos"
            options={ROLES}
            value={rol}
            onChange={(event) => setRol(event.target.value)}
          />
          <Button
            variant="secondary"
            onClick={() => {
              setBusqueda('');
              setRol('');
            }}
          >
            Limpiar
          </Button>
        </div>

        <UsuariosTable
          usuarios={filtrados}
          cargando={loading}
          onEdit={abrirEditar}
        />
      </section>

      <Modal
        open={modalAbierto}
        title={editando ? 'Editar usuario' : 'Nuevo usuario'}
        size="lg"
        onClose={cerrarModal}
      >
        <UsuarioForm
          usuarios={usuarios}
          usuario={editando}
          onSubmit={handleSave}
          onCancel={cerrarModal}
        />
      </Modal>
    </div>
  );
}
