import { useState } from 'react'
import '../styles/App.css'
import Login from './Login';
import Dashboard from './Dashboard';
import AppRoutes from '../routes/routes';

function App() {

  return (
    <div className="app-wrapper">
      <header className="blue-header">
      </header>
      <AppRoutes/>
    </div>
  )
}

export default App
