import PendingModule from '../components/common/PendingModule.jsx';

export default function PerfilPage() {
  return (
    <PendingModule
      title="Mi perfil"
      owner="Ángela"
      description="Datos del usuario en sesión y cambio de contraseña."
      components={['PerfilPage']}
      route="/perfil"
    />
  );
}
