import { useState } from 'react'
import '../styles/App.css'
import Login from './Login';

function App() {

  return (
    <div className="app-wrapper">
      <header className="blue-header">
      </header>

      <div className="login-container">
        <Login />
      </div>
    </div>
  )
}

export default App
