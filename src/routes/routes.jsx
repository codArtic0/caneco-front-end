import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import AdicionarSaldo from '../pages/AdicionarSaldo';
import ProtectedRoute from '../components/ProtectedRoute';
import Historico from '../pages/Historico';
import NovaVenda from '../pages/NovaVenda';
import Bebidas from '../pages/Bebidas';
import Refrigerantes from '../pages/Refrigerantes';
import Alcoolicas from '../pages/Alcoolicas';
import Sucos from '../pages/Sucos';
import Achocolatados from '../pages/Achocolatados';
import Energeticos from '../pages/Energeticos';
import Diversos from '../pages/Diversos';

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
                <Route path="/dashboard/nova-venda/bebidas" element={<ProtectedRoute element={<Bebidas />} />} />
                <Route path="/dashboard/nova-venda/bebidas/refrigerantes" element={<ProtectedRoute element={<Refrigerantes />} />} />
                <Route path="/dashboard/nova-venda/bebidas/alcoolicas" element={<ProtectedRoute element={<Alcoolicas />} />} />
                <Route path="/dashboard/nova-venda/bebidas/sucos" element={<ProtectedRoute element={<Sucos />} />} />
                <Route path="/dashboard/nova-venda/bebidas/achocolatados" element={<ProtectedRoute element={<Achocolatados />} />} />
                <Route path="/dashboard/nova-venda/bebidas/energeticos" element={<ProtectedRoute element={<Energeticos />} />} />
                <Route path="/dashboard/nova-venda/bebidas/diversos" element={<ProtectedRoute element={<Diversos />} />} />

            </Routes>
        </Router>
    );
}

export default AppRoutes;