import Table from '../ui/Table.jsx';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import Icon from '../common/Icon.jsx';
import { tonoEstado, tonoRol } from '../../utils/status.js';

export default function UsuariosTable({ usuarios = [], cargando = false, onEdit }) {
  const columnas = [
    {
      clave: 'nombre',
      titulo: 'Usuario',
      render: (usuario) => (
        <div className="user-cell">
          <span className="avatar avatar--sm">{usuario.iniciales || '?'}</span>
          <div>
            <strong>{usuario.nombre}</strong>
            <span>{usuario.email}</span>
          </div>
        </div>
      ),
    },
    {
      clave: 'rol',
      titulo: 'Rol',
      render: (usuario) => (
        <Badge tone={tonoRol(usuario.rol)}>{usuario.rol}</Badge>
      ),
    },
    { clave: 'cargo', titulo: 'Cargo' },
    { clave: 'ubicacion', titulo: 'Ubicación' },
    {
      clave: 'estado',
      titulo: 'Estado',
      render: (usuario) => (
        <Badge tone={tonoEstado(usuario.estado)}>{usuario.estado}</Badge>
      ),
    },
    {
      clave: 'acciones',
      titulo: 'Acciones',
      render: (usuario) => (
        <Button
          size="sm"
          variant="ghost"
          icon={<Icon name="edit" size={14} />}
          onClick={() => onEdit?.(usuario)}
        >
          Editar
        </Button>
      ),
    },
  ];

  return (
    <Table
      columnas={columnas}
      datos={usuarios}
      cargando={cargando}
      emptyTitle="Sin usuarios"
      emptyMessage="No hay usuarios que coincidan con los filtros."
    />
  );
}
