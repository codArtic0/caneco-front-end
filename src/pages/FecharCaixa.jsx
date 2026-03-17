import {useState, useEffect} from 'react';
import Button from '../components/Button';
import api from '../services/api';
import "../styles/Button.css";
import "../styles/Card.css";
import "../styles/Saldo.css";

export default function FecharCaixa() {
    const [vendas, setVendas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    const today = new Date().toISOString().slice(0, 10);

    const loadHistoricoHoje = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.get('/checkout/mostrar-historico', {
                params: {
                    data_inicial: today,
                    data_final: today,
                }
            });

            if (response.status === 200) {
                setVendas(response.data || []);
            }
        } catch (err) {
            console.error('Erro ao consultar histórico de vendas:', err);
            setError('Falha ao carregar o histórico. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadHistoricoHoje();
    }, []);

    const fecharRegistro = () => {
        if (window.confirm("Tem certeza que deseja fechar o caixa? Esta ação não pode ser desfeita.")) {
            logout();
        }}

    const totalVendas = vendas.length;
    const totalValor = vendas.reduce((sum, venda) => sum + Number(venda.total_price ?? 0), 0);

    return (
        <div className="page-container">
            <div className="saldo-card">
                <h1>Fechar Caixa</h1>
                <p className="subtitle">Histórico de vendas de <strong>{today}</strong></p>

                <div className="fechar-caixa-summary">
                    <div className="summary-item">
                        <span className="summary-label">Vendas</span>
                        <span className="summary-value">{totalVendas}</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Total</span>
                        <span className="summary-value">R$ {totalValor.toFixed(2)}</span>
                    </div>
                </div>

                <div className="lista-vendas" style={{ marginTop: '20px' }}>
                    {loading ? (
                        <p>Carregando histórico...</p>
                    ) : error ? (
                        <p className="error-text">{error}</p>
                    ) : vendas.length > 0 ? (
                        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>CPF do Cliente</th>
                                    <th>Valor Total</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendas.map((venda) => (
                                    <tr key={venda.checkout_code}>
                                        <td>{venda.checkout_code}</td>
                                        <td>{venda.costumer_cpf}</td>
                                        <td>R$ {Number(venda.total_price).toFixed(2)}</td>
                                        <td>{`${venda.sale_day}/${venda.sale_month}/${venda.sale_year}`}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Nenhuma venda registrada hoje.</p>
                    )}
                </div>

                <div className="actions" style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                    <Button onClick={fecharRegistro}>Fechar Caixa</Button>
                    <Button onClick={() => window.location.href = '/dashboard'}>Voltar ao Dashboard</Button>
                </div>
            </div>
        </div>
    );
}