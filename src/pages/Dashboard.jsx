import Button from "../components/Button";
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
    };

    return (
        <div>
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>DASHBOARD</h1>
                </div>
                <div className="dashboard-content">
                    <Button onClick={historico}>
                        Histórico de vendas
                    </Button>
                    <Button onClick={adicionarSaldo}>
                        Adicionar saldo
                    </Button>
                    <Button onClick={fecharRegistro}>
                        Fechar registro de caixa
                    </Button>
                    <Button onClick={novaVenda}>
                        Nova venda
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;