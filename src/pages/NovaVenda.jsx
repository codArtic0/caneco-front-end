import {useNavigate} from 'react-router-dom';

function NovaVenda() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Nova Venda</h1>
            <p>Esta é a página de nova venda. Em breve, aqui você poderá registrar uma nova venda e gerenciar os detalhes da transação.</p>
        </div>
    );
}

export default NovaVenda;