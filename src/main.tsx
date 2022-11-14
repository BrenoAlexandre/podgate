import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './pages/main';
import App from './pages/home';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Main>
      <App />
    </Main>
  </React.StrictMode>
);
