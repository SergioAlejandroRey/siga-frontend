import PendingModule from '../components/common/PendingModule.jsx';

export default function DevolucionesPage() {
  return (
    <PendingModule
      title="Módulo de devoluciones"
      owner="Veronica"
      description="Registro de devoluciones y cierre del ciclo de préstamo de cada activo."
      components={['DevolucionesPage', 'DevolucionForm']}
      route="/devoluciones"
    />
  );
}
