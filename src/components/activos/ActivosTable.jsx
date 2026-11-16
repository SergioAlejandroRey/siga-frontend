const ACTIVOS_INICIALES = [
  {
    codigo: 'ACT-001',
    nombre: 'Horno Industrial',
    categoria: 'Cocina',
    responsable: 'Carlos Mendoza',
    estado: 'Operativo'
  },
  {
    codigo: 'ACT-002',
    nombre: 'Licuadora Comercial',
    categoria: 'Barra',
    responsable: 'Laura Gómez',
    estado: 'Mantenimiento'
  },
  {
    codigo: 'ACT-003',
    nombre: 'Refrigerador Vertical',
    categoria: 'Refrigeración',
    responsable: 'Andrés Rojas',
    estado: 'Operativo'
  },
  {
    codigo: 'ACT-004',
    nombre: 'Freidora Doble',
    categoria: 'Cocina',
    responsable: 'Carlos Mendoza',
    estado: 'Crítico'
  }
];

function Badge({ estado }) {
  const estilosPorEstado = {
    Operativo: { backgroundColor: '#d4edda', color: '#155724' },
    Mantenimiento: { backgroundColor: '#fff3cd', color: '#856404' },
    Crítico: { backgroundColor: '#f8d7da', color: '#721c24' },
    Inactivo: { backgroundColor: '#e2e3e5', color: '#383d41' }
  };

  const estilo = {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'inline-block',
    ...(estilosPorEstado[estado] || estilosPorEstado.Inactivo)
  };

  return <span style={estilo}>{estado || 'Sin estado'}</span>;
}

function Table({ columnas, datos }) {
  const filas = Array.isArray(datos) ? datos : [];

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columnas.map((columna) => (
              <th
                key={columna}
                style={{
                  borderBottom: '2px solid #dee2e6',
                  padding: '10px',
                  textAlign: 'left',
                  color: '#006699',
                  fontSize: '14px'
                }}
              >
                {columna}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.length === 0 ? (
            <tr>
              <td
                colSpan={columnas.length}
                style={{
                  textAlign: 'center',
                  padding: '16px',
                  color: '#6c757d',
                  fontSize: '14px'
                }}
              >
                No hay activos para mostrar.
              </td>
            </tr>
          ) : (
            filas.map((activo, index) => (
              <tr
                key={activo.codigo || index}
                style={{ borderBottom: '1px solid #dee2e6', fontSize: '14px' }}
              >
                <td style={{ padding: '10px' }}>
                  <strong>{activo.codigo}</strong>
                </td>
                <td style={{ padding: '10px' }}>{activo.nombre}</td>
                <td style={{ padding: '10px' }}>{activo.categoria}</td>
                <td style={{ padding: '10px' }}>{activo.responsable}</td>
                <td style={{ padding: '10px' }}>
                  <Badge estado={activo.estado} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export function ActivosTable({ activos = ACTIVOS_INICIALES }) {
  const columnas = ['Código', 'Nombre', 'Categoría', 'Responsable', 'Estado'];

  return (
    <div
      className="card"
      style={{
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#006699' }}>
        Listado de Activos
      </h3>
      <Table columnas={columnas} datos={activos} />
    </div>
  );
}

export default ActivosTable;
