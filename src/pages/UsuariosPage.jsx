import PendingModule from '../components/common/PendingModule.jsx';

export default function UsuariosPage() {
  return (
    <PendingModule
      title="Administración de usuarios"
      owner="Ángela"
      description="Gestión de usuarios y roles. Esta ruta está disponible únicamente para el rol Administrador."
      components={['UsuariosPage', 'UsuariosTable', 'UsuarioForm']}
      route="/usuarios"
    />
  );
}
