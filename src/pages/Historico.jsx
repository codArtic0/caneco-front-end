import {useState } from "react";;
import "../styles/Button.css";
import Button from '../components/Button';
import "../styles/Card.css";
import api from '../services/api';

function Historico() {

    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');
    const [vendas, setVendas] = useState([]);

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
            const response = await api.get('/checkout/mostrar-historico', {
                params: {
                    data_inicial: dataInicial || undefined,
                    data_final: dataFinal || undefined,
                }
            });

            if (response.status === 200) {
                const historicoVendas = response.data;
                setVendas(historicoVendas);
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
                        <input
                            type="date"
                            id="data-inicial"
                            name="data-inicial"
                            value={dataInicial}
                            onChange={handleChangeDataInicial}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="data-final">Data final:</label>
                        <input
                            type="date"
                            id="data-final"
                            name="data-final"
                            value={dataFinal}
                            onChange={handleChangeDataFinal}
                        />
                    </div>
                    <Button onClick={handleConsultarHistorico}>Consultar Histórico</Button>
                </form>
                <Button onClick={() => window.location.href = '/dashboard'}>Voltar ao Dashboard</Button>

                <div className="lista-vendas" style={{ marginTop: '20px' }}>
                    <h3>Resultados:</h3>

                    {vendas.length > 0 ? (
                        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th>Checkout Code</th>
                                    <th>CPF do Cliente</th>
                                    <th>Valor Total</th>
                                    <th>Data da Venda</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendas.map((venda) => (
                                    <tr key={venda.checkout_code}>
                                        <td>{venda.checkout_code}</td>
                                        <td>{venda.costumer_cpf}</td>
                                        <td>{venda.total_price}</td>
                                        <td>{venda.sale_day + '/' + venda.sale_month + '/' + venda.sale_year}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Nenhum dado para exibir. Clique em consultar.</p>
                    )}
                </div>



            </div>
        </div>
    );
}

export default Historico;