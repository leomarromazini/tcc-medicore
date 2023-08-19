import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Providers from './providers/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Providers>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Providers>
    </BrowserRouter>
  </React.StrictMode>,
);
