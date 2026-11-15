import PendingModule from '../components/common/PendingModule.jsx';

export default function ReportesDanoPage() {
  return (
    <PendingModule
      title="Reportes de daño"
      owner="Veronica"
      description="Registro y seguimiento de los daños reportados sobre los activos."
      components={['ReportesDanoPage', 'ReporteDanoForm']}
      route="/reportes-dano"
    />
  );
}
