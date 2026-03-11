import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import AdicionarSaldo from '../pages/AdicionarSaldo';
import ProtectedRoute from '../components/ProtectedRoute';
import Historico from '../pages/Historico';
import NovaVenda from '../pages/NovaVenda';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                <Route path="/dashboard/historico" element={<ProtectedRoute element={<Historico />} />} />
                <Route path="/dashboard/adicionar-saldo" element={<ProtectedRoute element={<AdicionarSaldo />} />} />
                <Route path="/dashboard/fechar-registro" element={<ProtectedRoute element={<h1>Fechar registro de caixa</h1>} />} />
                <Route path="/dashboard/nova-venda" element={<ProtectedRoute element={<NovaVenda />} />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;