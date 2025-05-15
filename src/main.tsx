import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import './styles/animations.css'
import './styles/planet.css';
import './styles/modal.css';
import App from './App.tsx'
import '@fontsource/orbitron/400.css';
import '@fontsource/orbitron/700.css';
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
