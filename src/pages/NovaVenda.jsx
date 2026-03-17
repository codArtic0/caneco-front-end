import "../styles/Dashboard.css";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { SaleContext } from '../context/saleContext';
import Button from "../components/Button";

function NovaVenda() {
    const navigate = useNavigate();
    const { total, items, cpf, setCpf, setDiscount } = useContext(SaleContext);
    const [showCpfModal, setShowCpfModal] = useState(false);
    const [cpfInput, setCpfInput] = useState("");

    const formatCPF = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    };

    const produtos = () => {
        navigate('/dashboard/nova-venda/produtos');
    };

    const finalizarVenda = () => {
        if (items.length === 0) {
            alert("Adicione pelo menos um item antes de finalizar a venda.");
            return;
        }
        setShowCpfModal(true);
    };

    const handleConfirmCpf = () => {
        const formattedCpf = formatCPF(cpfInput);
        setCpf(formattedCpf);
        if (formattedCpf) {
            setDiscount(10);
        } else {
            setDiscount(0);
        }
        setShowCpfModal(false);
        setCpfInput("");
        navigate('/dashboard/finalizar-venda');
    };

    const handleCancelCpf = () => {
        setCpf("");
        setDiscount(0);
        setShowCpfModal(false);
        setCpfInput("");
        navigate('/dashboard/finalizar-venda');
    };

    const handleCadastrarCliente = () => {
        setShowCpfModal(false);
        navigate("/dashboard/cadastrar-cliente");
    };

    const handleChangeCpf = (e) => {
        const formattedCpf = formatCPF(e.target.value);
        setCpfInput(formattedCpf);
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
                    <Button onClick={produtos}>
                        Produtos
                    </Button>
                </div>

                <Button onClick={finalizarVenda}>
                    Finalizar Venda
                </Button>
            </div>

            {showCpfModal && (
                <div className="cpf-modal-overlay">
                    <div className="cpf-modal">
                        <h3>Identificação do cliente</h3>
                        <p style={{ marginBottom: 8, fontSize: 14 }}>
                            Você pode digitar o CPF do cliente já cadastrado ou cadastrar um novo cliente.
                        </p>
                        <input
                            type="text"
                            placeholder="000.000.000-00"
                            value={cpfInput}
                            onChange={handleChangeCpf}
                            maxLength={14}
                        />
                        <div className="cpf-modal-buttons">
                            <button onClick={handleConfirmCpf}>Confirmar</button>
                            <button onClick={handleCancelCpf}>Pular</button>
                            <button onClick={handleCadastrarCliente}>
                                Cadastrar cliente
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NovaVenda;