import { useState } from 'react';

export default function QrPage() {
  const [codigo, setCodigo] = useState('');
  const [activo, setActivo] = useState(null);

  const consultar = () => {
    if (!codigo.trim()) {
      alert('Ingresa el código QR o el código interno del activo');
      return;
    }
    // Simulación de la consulta
    setActivo({
      codigo: codigo,
      nombre: 'Activo consultado',
      estado: 'Disponible',
      ubicacion: 'Almacén'
    });
  };

  return (
    <div style={{maxWidth: '480px', margin: '40px auto', padding: '20px'}}>
      <h2>Consulta por Código QR / Código Interno</h2>
      <input
        type="text"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        placeholder="Código QR o código interno"
        style={{width: '100%', padding: '8px', marginBottom: '12px'}}
      />
      <button onClick={consultar} style={{width: '100%', padding: '10px'}}>
        Consultar Activo
      </button>

      {activo && (
        <div style={{marginTop: '20px', border: '1px solid #ccc', padding: '16px'}}>
          <h3>Ficha del Activo</h3>
          <p><strong>Código:</strong> {activo.codigo}</p>
          <p><strong>Nombre:</strong> {activo.nombre}</p>
          <p><strong>Estado:</strong> {activo.estado}</p>
          <p><strong>Ubicación:</strong> {activo.ubicacion}</p>
        </div>
      )}
    </div>
  );
}
