import "../styles/Dashboard.css";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { SaleContext } from '../context/saleContext';
import Button from "../components/Button";
import {showErrorAlert, showSuccessAlert} from "../services/alerts";
import api from "../services/api";

function NovaVenda() {
    const navigate = useNavigate();
    const { total, items, cpf, setCpf, setDiscount } = useContext(SaleContext);
    const [showCpfModal, setShowCpfModal] = useState(false);
    const [cpfInput, setCpfInput] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

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
            showErrorAlert("Adicione pelo menos um item antes de finalizar a venda.");
            return;
        }
        setShowCpfModal(true);
    };

    const closeAndNavigate = () => {
        setShowCpfModal(false);
        setCpfInput("");
        setFirstName("");
        setLastName("");
        setIsRegistering(false);
        navigate('/dashboard/finalizar-venda');
    };

    const handleSaveNewClient = async () => {
        if (!firstName || !lastName) {
            showErrorAlert("Por favor, preencha nome e sobrenome.");
            return;
        }

        setIsRegistering(true);
        try {
            const body = {
                cpf: cpf,
                first_name: firstName,
                last_name: lastName,
            };
            const resp = await api.post("/cadastrar-cliente", body);

            if (resp.status === 200 || resp.status === 201) {
                showSuccessAlert("Cliente cadastrado com sucesso!");
                setDiscount(10);
                closeAndNavigate();
            } else {
                showErrorAlert("Erro ao cadastrar cliente.", resp.data?.message || "Erro desconhecido");
            }
        } catch (error) {
            const errorMsg = error?.response?.data?.message || error?.message || "Erro desconhecido";
            showErrorAlert("Erro ao cadastrar cliente.", errorMsg);
        } finally {
            setIsRegistering(false);
        }
    };

    const verifyCPF = async (cpf) => {
    try {
        const response = await api.get(`checkout/verificarCpf/${cpf}`);
        return response.status; 
    } catch (error) {
        if (error.response) {
            return error.response.status;
        }
        return 500;
    }
};

    const handleConfirmCpf = () =>{
        const formattedCpf = formatCPF(cpfInput);
        setCpf(formattedCpf);

        if (formattedCpf.length<14){
            setDiscount(0);
            closeAndNavigate();
        }
        else {
            checkcpf(formattedCpf)
        }
    }
    const checkcpf = async (formattedCpf) => {
        
        const exists = await verifyCPF(formattedCpf);

        if (exists === 200) {
            setDiscount(10);
            closeAndNavigate();
        } else if (exists === 400) {
            setDiscount(0);
            closeAndNavigate();
        } else {
            setIsRegistering(true);
        }
    };

    const handleCancelCpf = () => {
        setCpf("");
        setDiscount(0);
        setShowCpfModal(false);
        setCpfInput("");
        navigate('/dashboard/finalizar-venda');
    };

    return (
        <div>
            <div className="card">
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
                        {!isRegistering ? (
                            <>
                                <h3>Identificação do cliente</h3>
                                <p>Digite o CPF para verificar cadastro e descontos.</p>
                                <input
                                    type="text"
                                    placeholder="000.000.000-00"
                                    value={cpfInput}
                                    onChange={(e) => setCpfInput(formatCPF(e.target.value))}
                                    maxLength={14}
                                />
                                <div className="cpf-modal-buttons">
                                    <button onClick={handleConfirmCpf}>Confirmar</button>
                                    <button onClick={handleCancelCpf}>Pular</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3>Cliente não encontrado</h3>
                                <p>Deseja cadastrar agora? Insira os dados abaixo:</p>
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    style={{ marginBottom: '10px' }}
                                />
                                <input
                                    type="text"
                                    placeholder="Sobrenome"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                <div className="cpf-modal-buttons">
                                    <button onClick={handleSaveNewClient}>Salvar e Finalizar</button>
                                    <button onClick={() => setIsRegistering(false)}>Voltar</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
        </div>
    );
}

export default NovaVenda;