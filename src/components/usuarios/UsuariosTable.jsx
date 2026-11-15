import PendingModule from '../common/PendingModule.jsx';

export default function UsuariosTable() {
  return (
    <PendingModule
      compact
      title="UsuariosTable"
      owner="Ángela"
      description="Listado de usuarios con rol, estado y acciones de administración."
      components={['Table', 'Badge', 'Button']}
    />
  );
}
