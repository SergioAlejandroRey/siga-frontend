import PendingModule from '../components/common/PendingModule.jsx';

export default function OrdenesPage() {
  return (
    <PendingModule
      title="Órdenes de trabajo"
      owner="Veronica"
      description="Creación y seguimiento de órdenes de trabajo asignadas a los técnicos."
      components={['OrdenesPage', 'OrdenForm']}
      route="/ordenes"
    />
  );
}
