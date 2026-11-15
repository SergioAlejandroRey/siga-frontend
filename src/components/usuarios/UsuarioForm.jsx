import PendingModule from '../common/PendingModule.jsx';

export default function UsuarioForm() {
  return (
    <PendingModule
      compact
      title="UsuarioForm"
      owner="Ángela"
      description="Alta y edición de usuarios con asignación de rol."
      components={['Input', 'Select', 'Button']}
    />
  );
}
