import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import ToastContainerProps from './utils/toasts/toastContainerProps';

import Main from './pages/main';

import './index.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Routes from './routes';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E4f76',
    },
    secondary: {
      main: '#275880',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1c1d',
          borderRadius: 0,
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer {...ToastContainerProps} />
    <ThemeProvider theme={theme}>
      <Main>
        <Router>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </Router>
      </Main>
    </ThemeProvider>
  </React.StrictMode>
);
