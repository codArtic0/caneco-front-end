import "../../styles/Dashboard.css";
import {useNavigate} from 'react-router-dom';

function produtos(){

    const navigate = useNavigate();

    const alcoolicas = () => {
        navigate('/dashboard/nova-venda/produtos/alcoolicas');
    }

    const refrigerantes = () => {
        navigate('/dashboard/nova-venda/produtos/refrigerantes');
    }

    const sucos = () => {
        navigate('/dashboard/nova-venda/produtos/sucos');
    }

    const achocolatados = () => {
        navigate('/dashboard/nova-venda/produtos/achocolatados');
    }

    const energeticos = () => {
        navigate('/dashboard/nova-venda/produtos/energeticos');
    }

    const diversos = () => {
        navigate('/dashboard/nova-venda/produtos/diversos');
    }

    return (
        <div>
            <div className="produtos-container">
                <div className="produtos-header">
                    <h1>Produtos</h1>
                </div>
                <div className="produtos-content">
                    <button className="botao-azul" onClick={refrigerantes}>
                        Refrigerantes
                    </button>
                    <button className="botao-azul" onClick={alcoolicas}>
                        Alcoolicas
                    </button>
                    <button className="botao-azul" onClick={sucos}>
                        Sucos
                    </button>
                    <button className="botao-azul" onClick={achocolatados}>
                        Achocolatados
                    </button>
                    <button className="botao-azul" onClick={energeticos}>
                        Energéticos
                    </button>
                    <button className="botao-azul" onClick={diversos}>
                        Diversos
                    </button>
                </div>
            </div>
        </div>
    );
}
export default produtos;