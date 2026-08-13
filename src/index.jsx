import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <div style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
      <Header />
      <Dashboard />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
