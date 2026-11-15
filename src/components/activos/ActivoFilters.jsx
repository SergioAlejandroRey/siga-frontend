import PendingModule from '../common/PendingModule.jsx';

export default function ActivoFilters() {
  return (
    <PendingModule
      compact
      title="ActivoFilters"
      owner="Ángela"
      description="Búsqueda por código o nombre y filtros por categoría y estado."
      components={['Input', 'Select', 'Button']}
    />
  );
}
