import React, {useState, useEffect} from 'react';
import '../styles/Login.css';

function Login() {
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const handleChangeCPF = (e) => {
    const formattedCpf = formatCPF(e.target.value);
    setCpf(formattedCpf);
  };

  const handleChangePassword = (e) => {
    const senha = (e.target.value);
    setSenha(senha);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dados = {
        cpf: cpf,
        password: senha.toString()
    }

    try{
        const response = await fetch("http://localhost:3000/admin/logar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      if (response.ok){
        const data = await response.json();
        alert("Sucesso!", response.json);
      }
      else{
        alert(data.message || "Erro de login");
      }
    } catch (error) {
        console.error("Erro", error);
        alert("Deu erro no server")
      }
    
    console.log("Enviando para o servidor:", cpf, senha);
  };
    return (
        <div className="login-form">
            <div className='login-card'>
                <h2>Bem vindo</h2>
                <h1 className='login'>Faça Login no Sistema</h1>
                <form onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label>CPF</label>
                        <input type="text" placeholder="000.000.000-00" value={cpf}onChange={handleChangeCPF}>
                    </input>
                    </div>
                    <div className='input-group'>
                            <label>Senha</label>
                            <input type="password" placeholder="Senha" value={senha}onChange={handleChangePassword} />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;