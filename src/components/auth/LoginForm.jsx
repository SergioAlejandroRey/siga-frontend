import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import Icon from '../common/Icon.jsx';

const CREDENCIALES = [
  {
    rol: 'Administrador',
    email: 'admin@siga.com',
    password: 'admin123',
    tone: 'purple',
  },
  {
    rol: 'Técnico',
    email: 'tecnico@siga.com',
    password: 'tecnico123',
    tone: 'blue',
  },
  {
    rol: 'Operario',
    email: 'operario@siga.com',
    password: 'operario123',
    tone: 'green',
  },
];

export default function LoginForm({ onSuccess }) {
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  }

  function usarCredenciales(credencial) {
    setForm({ email: credencial.email, password: credencial.password });
    setError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!form.email.trim() || !form.password) {
      setError('Escribe el correo y la contraseña para continuar.');
      return;
    }

    try {
      const usuario = await login(form.email, form.password);
      onSuccess?.(usuario);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <div className="login-form__header">
        <span className="eyebrow">Acceso al sistema</span>
        <h2>Inicia sesión</h2>
        <p>
          Ingresa con uno de los usuarios de prueba para recorrer los módulos del
          SIGA.
        </p>
      </div>

      {error ? (
        <div className="form-alert" role="alert">
          <Icon name="alert" size={16} />
          <span>{error}</span>
        </div>
      ) : null}

      <Input
        label="Correo electrónico"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="admin@siga.com"
        value={form.email}
        onChange={handleChange}
      />

      <Input
        label="Contraseña"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        value={form.password}
        onChange={handleChange}
      />

      <Button
        type="submit"
        loading={loading}
        className="login-form__submit"
        icon={<Icon name="arrow" size={16} />}
      >
        Entrar al panel
      </Button>

      <div className="login-form__divider">
        <span>Credenciales de prueba</span>
      </div>

      <div className="login-form__credentials">
        {CREDENCIALES.map((credencial) => (
          <button
            key={credencial.email}
            type="button"
            className={`credential-card credential-card--${credencial.tone}`}
            onClick={() => usarCredenciales(credencial)}
          >
            <span className="credential-card__role">{credencial.rol}</span>
            <span className="credential-card__email">{credencial.email}</span>
            <span className="credential-card__password">{credencial.password}</span>
          </button>
        ))}
      </div>

      <p className="login-form__note">
        <Icon name="database" size={14} />
        Datos mock guardados en localStorage. No se envía información a un
        servidor.
      </p>
    </form>
  );
}
