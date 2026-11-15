import PendingModule from '../common/PendingModule.jsx';

export default function OrdenForm() {
  return (
    <PendingModule
      compact
      title="OrdenForm"
      owner="Veronica"
      description="Creación y asignación de una orden de trabajo a un técnico."
      components={['Input', 'Select', 'Button']}
    />
  );
}
