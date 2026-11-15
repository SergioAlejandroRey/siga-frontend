import PendingModule from '../common/PendingModule.jsx';

export default function ActivosTable() {
  return (
    <PendingModule
      compact
      title="ActivosTable"
      owner="Ángela"
      description="Tabla de activos con código, nombre, categoría, responsable y estado."
      components={['Table', 'Badge', 'Button']}
    />
  );
}
