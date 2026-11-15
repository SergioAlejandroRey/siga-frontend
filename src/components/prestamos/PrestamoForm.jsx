import PendingModule from '../common/PendingModule.jsx';

export default function PrestamoForm() {
  return (
    <PendingModule
      compact
      title="PrestamoForm"
      owner="Veronica"
      description="Selección de activo disponible, solicitante, fechas y observaciones."
      components={['Select', 'Input', 'Button']}
    />
  );
}
