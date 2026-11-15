import PendingModule from '../components/common/PendingModule.jsx';

export default function QrPage() {
  return (
    <PendingModule
      title="Consulta por QR"
      owner="Veronica"
      description="Búsqueda de un activo por su código QR o por su código interno."
      components={['QrPage']}
      route="/qr"
    />
  );
}
