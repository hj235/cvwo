import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles';
import theme from './layout/theme.ts';
import './index.css'
import App from './App.tsx'

// Context providers
import { UserContextProvider } from './context/UserContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ThemeProvider>
  </StrictMode>,
)
