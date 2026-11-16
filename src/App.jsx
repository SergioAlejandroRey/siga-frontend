import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { SigaProvider } from './context/SigaContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SigaProvider>
          <AppRoutes />
        </SigaProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
