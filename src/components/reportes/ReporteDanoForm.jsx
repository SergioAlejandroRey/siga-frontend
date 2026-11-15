import PendingModule from '../common/PendingModule.jsx';

export default function ReporteDanoForm() {
  return (
    <PendingModule
      compact
      title="ReporteDanoForm"
      owner="Veronica"
      description="Activo afectado, descripción del daño, prioridad y evidencia."
      components={['Select', 'Input', 'Button']}
    />
  );
}
