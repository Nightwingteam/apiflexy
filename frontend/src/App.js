import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Dashboard from './pages/Dashboard';
import Connections from './pages/Connections';
import QueryInterface from './pages/QueryInterface';
import History from './pages/History';
import Documentation from './pages/Documentation';
import Integration from './pages/Integration';
import Explorer from './pages/Explorer';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';

// Modern theme with better colors and typography
const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1', // Indigo
      light: '#8b5cf6', // Purple
      dark: '#4f46e5',
    },
    secondary: {
      main: '#10b981', // Emerald
      light: '#34d399',
      dark: '#059669',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    body1: {
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
});

const AppContainer = styled(Box)({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#f8fafc',
});

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '280px',
  transition: 'margin-left 0.3s ease',
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
  },
}));

const ContentArea = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  maxWidth: '100%',
  overflow: 'hidden',
}));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContainer>
        <Sidebar />
        <MainContent>
          <Header />
          <ContentArea>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/query" element={<QueryInterface />} />
              <Route path="/history" element={<History />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/integration" element={<Integration />} />
              <Route path="/explorer" element={<Explorer />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>
          </ContentArea>
        </MainContent>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App; 