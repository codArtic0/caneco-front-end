import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import AdicionarSaldo from '../pages/AdicionarSaldo';
import ProtectedRoute from '../components/ProtectedRoute';
import Historico from '../pages/Historico';
import NovaVenda from '../pages/NovaVenda';
import FinalizarVenda from '../pages/FinalizarVenda';
import ImprimirNota from '../pages/ImprimirNota';
import Produtos from "../pages/produtos/Produtos";
import Refrigerantes from '../pages/produtos/Refrigerantes';
import Alcoolicas from '../pages/produtos/Alcoolicas';
import Sucos from '../pages/produtos/Sucos';
import Achocolatados from '../pages/produtos/Achocolatados';
import Energeticos from '../pages/produtos/Energeticos';
import Diversos from '../pages/produtos/Diversos';
import FecharCaixa from '../pages/FecharCaixa';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                <Route path="/dashboard/historico" element={<ProtectedRoute element={<Historico />} />} />
                <Route path="/dashboard/adicionar-saldo" element={<ProtectedRoute element={<AdicionarSaldo />} />} />
                <Route path="/dashboard/fechar-registro" element={<ProtectedRoute element={<FecharCaixa />} /> } />
                <Route path="/dashboard/nova-venda" element={<ProtectedRoute element={<NovaVenda />} />} />
                <Route path="/dashboard/nova-venda/produtos" element={<ProtectedRoute element={<Produtos />} />} />
                <Route path="/dashboard/nova-venda/produtos/refrigerantes" element={<ProtectedRoute element={<Refrigerantes />} />} />
                <Route path="/dashboard/nova-venda/produtos/alcoolicas" element={<ProtectedRoute element={<Alcoolicas />} />} />
                <Route path="/dashboard/nova-venda/produtos/sucos" element={<ProtectedRoute element={<Sucos />} />} />
                <Route path="/dashboard/nova-venda/produtos/achocolatados" element={<ProtectedRoute element={<Achocolatados />} />} />
                <Route path="/dashboard/nova-venda/produtos/energeticos" element={<ProtectedRoute element={<Energeticos />} />} />
                <Route path="/dashboard/nova-venda/produtos/diversos" element={<ProtectedRoute element={<Diversos />} />} />
                <Route path="/dashboard/finalizar-venda" element={<ProtectedRoute element={<FinalizarVenda />} />} />
                <Route path="/dashboard/imprimir-nota" element={<ProtectedRoute element={<ImprimirNota />} />} />

            </Routes>
        </Router>
    );
}

export default AppRoutes;