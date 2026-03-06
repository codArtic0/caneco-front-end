import "../styles/Dashboard.css";
import {useNavigate} from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    const historico = () => {
        navigate('/dashboard/historico');
    };

    const adicionarSaldo = () => {
        navigate('/dashboard/adicionar-saldo');
    };

    const fecharRegistro = () => {
        navigate('/dashboard/fechar-registro');
    };

    const novaVenda = () => {
        navigate('/dashboard/nova-venda');
    }

    return (
        <div>
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>DASHBOARD</h1>
                </div>
                <div className="dashboard-content">
                    <button className="botao-azul" onClick={historico}>
                        Histórico de vendas
                    </button>
                    <button className="botao-azul" onClick={adicionarSaldo}>Adicionar saldo</button>
                    <button className="botao-azul" onClick={fecharRegistro}>Fechar registro de caixa</button>
                    <button className="botao-azul" onClick={novaVenda}>Nova venda</button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;