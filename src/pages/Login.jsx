import React, {useState} from 'react';
import '../styles/Login.css';

function Login() {
    const [cpf, setCpf] = useState("");

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const handleChange = (e) => {
    const formattedCpf = formatCPF(e.target.value);
    setCpf(formattedCpf);
  };
    return (
        <div className="login-form">
            <div className='login-card'>
                <h2>Bem vindo</h2>
                <h1 className='login'>Faça Login no Sistema</h1>
                <form>
                    <div className='input-group'>
                        <label>CPF</label>
                        <input type="text" placeholder="000.000.000-00" value={cpf}onChange={handleChange}>
                    </input>
                    </div>
                    <div className='input-group'>
                            <label>Senha</label>
                            <input type="password" placeholder="Senha" />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;