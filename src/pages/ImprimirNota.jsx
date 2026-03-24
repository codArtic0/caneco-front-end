import { useContext } from "react";
import { SaleContext } from "../context/saleContext";
import "../styles/ImprimirNota.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function ImprimirNota() {
    const { items, total } = useContext(SaleContext);

    const navigate = useNavigate();

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="imprimir-nota-container">
            <div className="nota">
                <h3>NOTA FISCAL</h3>
                <div className="header-info">
                    <p>Caixa 1 : #001</p>
                    <p>Data/Hora: {new Date().toLocaleString()}</p>
                </div>
                {items.length === 0 ? (
                    <div className="nota-empty">Nenhum item adicionado</div>
                ) : (
                    <div className="nota-items">
                        {items.map((item, index) => (
                            <div key={index} className="nota-item">
                                <span>{item.quantity}x {item.name}</span>
                                <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                )}
                <div className="nota-total">
                    <strong>Total: R$ {total.toFixed(2)}</strong>
                </div>
            </div>
            <button className="print-button" onClick={handlePrint}>
                Imprimir Nota
            </button>
            <Button onClick={() => (navigate("/dashboard/finalizar-venda"))}>
                Voltar
            </Button>
        </div>
    );
}