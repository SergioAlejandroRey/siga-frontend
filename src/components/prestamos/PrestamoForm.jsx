import { useState } from 'react';

export default function PrestamoForm() {
  const [form, setForm] = useState({
    usuario: '',
    activo: '',
    fechaPrestamo: '',
    observacion: ''
  });

  const [activoDisponible, setActivoDisponible] = useState(true);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validarYEnviar = (e) => {
    e.preventDefault();
    if (!activoDisponible) {
      alert('⚠️ El activo no se encuentra disponible para préstamo');
      return;
    }
    alert('✅ Préstamo registrado:\n' + JSON.stringify(form, null, 2));
    setForm({ usuario: '', activo: '', fechaPrestamo: '', observacion: '' });
  };

  return (
    <div style={{maxWidth: '500px', margin: '30px auto', padding: '20px'}}>
      <h3>Formulario de Préstamo</h3>
      <form onSubmit={validarYEnviar}>
        <label>Usuario:</label>
        <input
          type="text"
          name="usuario"
          value={form.usuario}
          onChange={handleChange}
          style={{width: '100%', marginBottom: '12px', padding: '8px'}}
        />

        <label>Activo:</label>
        <input
          type="text"
          name="activo"
          value={form.activo}
          onChange={handleChange}
          style={{width: '100%', marginBottom: '12px', padding: '8px'}}
        />

        <label>Fecha de préstamo:</label>
        <input
          type="date"
          name="fechaPrestamo"
          value={form.fechaPrestamo}
          onChange={handleChange}
          style={{width: '100%', marginBottom: '12px', padding: '8px'}}
        />

        <label>Observación:</label>
        <textarea
          name="observacion"
          value={form.observacion}
          onChange={handleChange}
          style={{width: '100%', marginBottom: '16px', padding: '8px'}}
        />

        <button type="submit" style={{width: '100%', padding: '10px'}}>
          Registrar Préstamo
        </button>
      </form>
    </div>
  );
}
