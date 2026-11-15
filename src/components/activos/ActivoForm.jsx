import PendingModule from '../common/PendingModule.jsx';

export default function ActivoForm() {
  return (
    <PendingModule
      compact
      title="ActivoForm"
      owner="Ángela"
      description="Formulario para crear o editar un activo con validación de campos."
      components={['Input', 'Select', 'Button']}
    />
  );
}
