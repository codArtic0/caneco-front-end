import "../styles/Dashboard.css";
import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { SaleContext } from '../context/SaleContext';

function NovaVenda() {
    const navigate = useNavigate();
    const { total, items } = useContext(SaleContext);

    const bebidas = () => {
        navigate('/dashboard/nova-venda/bebidas');
    };

    return (
        <div>
            <div className="nova-venda-container">
                <div className="nova-venda-header">
                    <h1>Nova venda</h1>
                    <h2>Total da venda: R$ {total.toFixed(2)}</h2>
                    {items.length > 0 && (
                        <div>
                            <h3>Itens:</h3>
                            {items.map((item, index) => (
                                <div key={index}>
                                    {item.name} - Quantidade: {item.quantity} - Preço: R$ {(item.price * item.quantity).toFixed(2)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="nova-venda-content">
                    <button className="botao-azul" onClick={bebidas}> bebidas </button>
                </div>
            </div>
        </div>
    );
}

export default NovaVenda;