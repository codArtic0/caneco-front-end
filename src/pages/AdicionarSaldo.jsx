import React from "react";
import axios from 'axios';
import Button from "../components/Button";
import "../styles/Saldo.css";
import api from "../services/api";

function AdicionarSaldo() {

    const handleChangeAmount = (e) => {
    const amount = (e.target.value);
    setAmount(amount);
  };

    const [amount, setAmount] = React.useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await api.put('/admin/adicionar-saldo', { amount });

        if (response.status == 200){
            alert("Saldo adicionado com sucesso!", response.data);
        }
        } catch (error) {
            alert("Erro ao adicionar saldo", error.response.data.error);
            console.error("Erro no Servidor", error);
            alert(error.response.data.error)
        }
        
    };

    return (
        
        <div>
            <div className="saldo-card">
            <h1>Adicionar Saldo</h1>
            <form>
                <label htmlFor="amount">Valor a adicionar:</label>
                <input type="number" id="amount" name="amount" min="0" step="0.01" required onChange={handleChangeAmount} />
                <Button onClick={handleSubmit}>Adicionar Saldo</Button>
            </form>
            <Button onClick={() => window.location.href = '/dashboard'}>Voltar ao Dashboard</Button>
            </div>
        </div>
    );
}

export default AdicionarSaldo;