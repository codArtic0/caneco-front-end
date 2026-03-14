import "../../styles/Dashboard.css";
import React from "react";
import {useNavigate} from 'react-router-dom';

function Bebidas(){

    const navigate = useNavigate();

    const alcoolicas = () => {
        navigate('/dashboard/nova-venda/bebidas/alcoolicas');
    }

    const refrigerantes = () => {
        navigate('/dashboard/nova-venda/bebidas/refrigerantes');
    }

    const sucos = () => {
        navigate('/dashboard/nova-venda/bebidas/sucos');
    }

    const achocolatados = () => {
        navigate('/dashboard/nova-venda/bebidas/achocolatados');
    }

    const energeticos = () => {
        navigate('/dashboard/nova-venda/bebidas/energeticos');
    }

    const diversos = () => {
        navigate('/dashboard/nova-venda/bebidas/diversos');
    }

    return (
        <div>
            <div className="bebidas-container">
                <div className="bebidas-header">
                    <h1>BEBIDAS</h1>
                </div>
                <div className="bebidas-content">
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
export default Bebidas;