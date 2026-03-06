import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from '../components/ProtectedRoute';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                <Route path="/dashboard/historico" element={<ProtectedRoute element={<h1>Histórico de vendas</h1>} />} />
                <Route path="/dashboard/adicionar-saldo" element={<ProtectedRoute element={<h1>Adicionar saldo</h1>} />} />
                <Route path="/dashboard/fechar-registro" element={<ProtectedRoute element={<h1>Fechar registro de caixa</h1>} />} />
                <Route path="/dashboard/nova-venda" element={<ProtectedRoute element={<h1>Nova venda</h1>} />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;