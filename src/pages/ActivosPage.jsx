import PendingModule from '../components/common/PendingModule.jsx';

export default function ActivosPage() {
  return (
    <PendingModule
      title="Módulo de activos"
      owner="Ángela"
      description="Listado, búsqueda, filtros, creación, detalle y edición de los activos de la empresa."
      components={['ActivosPage', 'ActivosTable', 'ActivoFilters', 'ActivoForm', 'ActivoDetail']}
      route="/activos"
    />
  );
}
