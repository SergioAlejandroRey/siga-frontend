import { useState } from 'react';
import PrestamoForm from '../components/prestamos/PrestamoForm.jsx';

export default function PrestamosPage() {
  const [listaPrestamos, setListaPrestamos] = useState([]);

  const agregarPrestamo = (nuevoPrestamo) => {
    setListaPrestamos([...listaPrestamos, nuevoPrestamo]);
  };

  return (
    <div style={{maxWidth: '700px', margin: '40px auto'}}>
      <h2>Préstamos de Activos</h2>

      {/* Reutilizamos el formulario que ya hiciste */}
      <PrestamoForm onGuardar={agregarPrestamo} />

      <h3 style={{marginTop: '30px'}}>Listado de Préstamos</h3>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr style={{backgroundColor: '#eee'}}>
            <th style={{border: '1px solid #ccc', padding: '8px'}}>Usuario</th>
            <th style={{border: '1px solid #ccc', padding: '8px'}}>Activo</th>
            <th style={{border: '1px solid #ccc', padding: '8px'}}>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {listaPrestamos.map((prestamo, index) => (
            <tr key={index}>
              <td style={{border: '1px solid #ccc', padding: '8px'}}>{prestamo.usuario}</td>
              <td style={{border: '1px solid #ccc', padding: '8px'}}>{prestamo.activo}</td>
              <td style={{border: '1px solid #ccc', padding: '8px'}}>{prestamo.fechaPrestamo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
