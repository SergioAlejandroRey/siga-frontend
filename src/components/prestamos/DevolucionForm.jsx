import PendingModule from '../common/PendingModule.jsx';

export default function DevolucionForm() {
  return (
    <PendingModule
      compact
      title="DevolucionForm"
      owner="Veronica"
      description="Registro de la devolución y estado en que se recibe el activo."
      components={['Select', 'Input', 'Button']}
    />
  );
}
