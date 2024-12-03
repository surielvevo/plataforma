import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';
import { theme } from './theme';

// Componentes
import { Login } from './components/Auth/Login';
import { MainLayout } from './components/Layout/MainLayout';
import { PrivateRoute } from './components/Auth/PrivateRoute';

// Páginas
import { Dashboard } from './pages/Dashboard';
import { Investigaciones } from './pages/Investigaciones';
import { Presupuestos } from './pages/Presupuestos';
import { Reportes } from './pages/Reportes';
import { Configuracion } from './pages/Configuracion';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={<PrivateRoute />}>
              <Route element={<MainLayout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="investigaciones" element={<Investigaciones />} />
                <Route path="presupuestos" element={<Presupuestos />} />
                <Route path="reportes" element={<Reportes />} />
                <Route path="configuracion" element={<Configuracion />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App; 