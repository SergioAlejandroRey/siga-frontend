import PendingModule from '../components/common/PendingModule.jsx';

export default function PrestamosPage() {
  return (
    <PendingModule
      title="Módulo de préstamos"
      owner="Veronica"
      description="Listado y registro de préstamos de activos disponibles, con su responsable y fechas."
      components={['PrestamosPage', 'PrestamoForm']}
      route="/prestamos"
    />
  );
}
