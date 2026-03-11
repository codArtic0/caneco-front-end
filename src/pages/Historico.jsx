import React from 'react';
import "../styles/Button.css";
import Button from '../components/Button';
import "../styles/Card.css";
import api from '../services/api';

function Historico() {

    const [dataInicial, setDataInicial] = React.useState('');
    const [dataFinal, setDataFinal] = React.useState('');

    const handleChangeDataInicial = (e) => {
        const data = e.target.value;
        setDataInicial(data);
    };

    const handleChangeDataFinal = (e) => {
        const data = e.target.value;
        setDataFinal(data);
    };

    const handleConsultarHistorico = async (e) => {
        e.preventDefault();

        try {
            const response = await api.get('/checkout/mostrar-historico');

            if (response.status === 200) {
                const historicoVendas = response.data;
                console.log('Histórico de vendas:', historicoVendas);
                alert('Histórico de vendas consultado com sucesso! Verifique o console para detalhes.');
            }
        } catch (error) {
            console.error('Erro ao consultar histórico de vendas:', error);
        }

    };

    return (
        <div>
            <div className="card">
            <form className="form-historico">
                <div className="input-group">
                    <label htmlFor="data-inicial">Data inicial:</label>
                    <input type="date" id="data-inicial" name="data-inicial" />
                </div>
                <div className="input-group">
                    <label htmlFor="data-final">Data final:</label>
                    <input type="date" id="data-final" name="data-final" />
                </div>
                <Button onClick={handleConsultarHistorico}>Consultar Histórico</Button>
            </form>
            </div>
        </div>
    );
}

export default Historico;