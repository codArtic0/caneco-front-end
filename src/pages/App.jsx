import { useState } from 'react'
import '../styles/App.css'
import Login from './Login';
import Dashboard from './Dashboard';
import AppRoutes from '../routes/routes';
import { SaleProvider } from '../context/saleContext';

function App() {

  return (
    <SaleProvider>
      <div className="app-wrapper">
        <header className="blue-header">
        </header>
        <AppRoutes />
      </div>
    </SaleProvider>
  )
}

export default App