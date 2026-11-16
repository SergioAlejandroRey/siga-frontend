import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { loginRequest } from '../services/authService';
import {
  readStorage,
  removeStorage,
  STORAGE_KEYS,
  writeStorage,
} from '../services/storage';

const AuthContext = createContext(null);

/**
 * Provee la sesión del usuario a toda la aplicación.
 * La sesión se conserva en localStorage para que el usuario no tenga que
 * iniciar sesión de nuevo al recargar la página.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStorage(STORAGE_KEYS.session, null));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError('');

    try {
      const usuario = await loginRequest(email, password);
      setUser(usuario);
      writeStorage(STORAGE_KEYS.session, usuario);
      return usuario;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError('');
    removeStorage(STORAGE_KEYS.session);
  }, []);

  const updateSession = useCallback((data) => {
    setUser((prev) => {
      if (!prev) return prev;
      const siguiente = { ...prev, ...data };
      writeStorage(STORAGE_KEYS.session, siguiente);
      return siguiente;
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      logout,
      updateSession,
      isAuthenticated: Boolean(user),
    }),
    [user, loading, error, login, logout, updateSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}
