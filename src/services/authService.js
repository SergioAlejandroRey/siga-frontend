import { USUARIOS_INICIALES } from '../data/mockData';
import { readStorage, STORAGE_KEYS } from './storage';

const ESPERA_SIMULADA = 450;

function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Valida las credenciales contra los usuarios guardados en localStorage.
 * Se comporta como un servicio real: es asíncrono y lanza un error si el
 * acceso no es válido. Así el LoginForm puede mostrar el estado de carga.
 */
export async function loginRequest(email, password) {
  await esperar(ESPERA_SIMULADA);

  const usuarios = readStorage(STORAGE_KEYS.usuarios, USUARIOS_INICIALES);
  const correo = String(email ?? '').trim().toLowerCase();
  const encontrado = usuarios.find(
    (usuario) =>
      String(usuario.email).toLowerCase() === correo &&
      usuario.password === password,
  );

  if (!encontrado) {
    throw new Error('El correo o la contraseña no son correctos.');
  }

  if (encontrado.estado !== 'Activo') {
    throw new Error('El usuario está inactivo. Contacta al administrador.');
  }

  const { password: _password, ...usuarioSeguro } = encontrado;
  return usuarioSeguro;
}
