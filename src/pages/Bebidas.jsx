import "../styles/Dashboard.css";
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
                </div>
            </div>
        </div>
    );
}
export default Bebidas;