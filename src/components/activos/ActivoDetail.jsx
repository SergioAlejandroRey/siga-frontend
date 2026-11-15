import PendingModule from '../common/PendingModule.jsx';

export default function ActivoDetail() {
  return (
    <PendingModule
      compact
      title="ActivoDetail"
      owner="Ángela"
      description="Ficha completa del activo, incluido su código QR y su estado actual."
      components={['Badge', 'Button']}
    />
  );
}
