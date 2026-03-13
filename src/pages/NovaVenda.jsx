import "../styles/Dashboard.css";
import React from "react";
import {useNavigate} from 'react-router-dom';

function NovaVenda() {
    const navigate = useNavigate();

    const bebidas = () => {
        navigate('/dashboard/nova-venda/bebidas');
    };

    return (
        <div>
            <div className="nova-venda-container">
                <div className="nova-venda-header">
                    <h1>Nova venda</h1>
                </div>
                <div className="nova-venda-content">
                    <button className="botao-azul" onClick={bebidas}> bebidas </button>
                </div>
            </div>
        </div>
    );
}

export default NovaVenda;