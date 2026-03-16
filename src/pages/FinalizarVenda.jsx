import "../styles/FinalizarVenda.css";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { SaleContext } from "../context/saleContext";

export default function FinalizarVenda() {
  const navigate = useNavigate();
  const { items, total, clearSale } = useContext(SaleContext);

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const [operator, setOperator] = useState("FULANO");
  const [dateTime, setDateTime] = useState(() => new Date().toLocaleString());
  const [payments, setPayments] = useState({
    dinheiro: 0,
    pix: 0,
    debito: 0,
    credito: 0,
  });
  const [showCpfModal, setShowCpfModal] = useState(false);
  const [cpfInput, setCpfInput] = useState("");
  const [cpf, setCpf] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    api.get("/admin/nome-operador")
      .then((response) => {
        if (response.data && response.data.name) {
          setOperator(response.data.name);
        }
      })
      .catch(() => {
        
      });
  }, []);

  const valorPago = useMemo(() => {
    return (
      payments.dinheiro +
      payments.pix +
      payments.debito +
      payments.credito
    );
  }, [payments]);

  const troco = useMemo(() => {
    return Math.max(0, valorPago - total);
  }, [valorPago, total]);

  const falta = useMemo(() => {
    return Math.max(0, total - valorPago);
  }, [valorPago, total]);

  const handleAddPayment = (method, label) => {
    const input = window.prompt(`Digite o valor em R$ para ${label}`);
    if (!input) return;
    const value = parseFloat(input.replace(/,/g, "."));

    if (Number.isNaN(value) || value <= 0) {
      alert("Digite um valor válido maior que 0.");
      return;
    }

    setPayments((prev) => ({
      ...prev,
      [method]: prev[method] + value,
    }));
  };

  const handleFinalizarVenda = () => {
    if (items.length === 0) {
      alert("Adicione pelo menos um item antes de finalizar a venda.");
      return;
    }

    if (valorPago < total) {
      alert(`Ainda faltam R$ ${falta.toFixed(2)} para completar a venda.`);
      return;
    }

    setShowCpfModal(true);
  };

  const handleEditarItens = () => {
    navigate("/dashboard/nova-venda");
  };

  const handleConfirmCpf = () => {
    const formattedCpf = formatCPF(cpfInput);
    setCpf(formattedCpf);
    setShowCpfModal(false);
    setCpfInput("");
    
    clearSale();
    setPayments({ dinheiro: 0, pix: 0, debito: 0, credito: 0 });
    alert(`Venda finalizada com sucesso! CPF: ${formattedCpf}`);
    navigate("/dashboard");
  };

  const handleCancelCpf = () => {
    setCpf("");
    setShowCpfModal(false);
    setCpfInput("");
    clearSale();
    setPayments({ dinheiro: 0, pix: 0, debito: 0, credito: 0 });
    alert("Venda finalizada com sucesso!");
    navigate("/dashboard");
  };

  const handleChangeCpf = (e) => {
    const formattedCpf = formatCPF(e.target.value);
    setCpfInput(formattedCpf);
  };

  return (
    <div className="finalizar-venda-container">
      <div className="finalizar-venda-card">
        <div className="header-info">
          <h1>Caixa 1 : #001</h1>
          <small>{dateTime}</small>
        </div>

        <div className="nota">
          <h3>NOTA</h3>
          {items.length === 0 ? (
            <div className="nota-empty">Nenhum item adicionado ainda</div>
          ) : (
            items.map((item, index) => (
              <div key={index} className="nota-item">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))
          )}
        </div>

        <div className="action-buttons">
          <button
            type="button"
            className="botao-amarelo"
            onClick={() => navigate("/dashboard/imprimir-nota")}
          >
            Imprimir Nota
          </button>


          <button
            type="button"
            className="botao-verde"
            onClick={handleEditarItens}
          >
            Editar Itens
          </button>
          
          <button
            type="button"
            className="botao-vermelho"
            onClick={handleFinalizarVenda}
          >
            Finalizar Venda
          </button>
        </div>
      </div>

      <div className="finalizar-venda-summary">
        <div className="total-row">
          <div className="total-box total">
            <span>TOTAL (R$)</span>
            <h1>{total.toFixed(2)}</h1>
          </div>
          <div className="total-box">
            <span>Valor Pago (R$)</span>
            <h1>{valorPago.toFixed(2)}</h1>
          </div>
          <div className="total-box troco">
            <span>Troco (R$)</span>
            <h1>{troco.toFixed(2)}</h1>
          </div>
        </div>

        <div className="payment-grid">
          <div className="payment-card">
            <span>Dinheiro (R$)</span>
            <strong>{payments.dinheiro.toFixed(2)}</strong>
            <button type="button" onClick={() => handleAddPayment("dinheiro", "dinheiro")}>+
            </button>
          </div>
          <div className="payment-card">
            <span>PIX (R$)</span>
            <strong>{payments.pix.toFixed(2)}</strong>
            <button type="button" onClick={() => handleAddPayment("pix", "PIX")}>+
            </button>
          </div>
          <div className="payment-card">
            <span>Débito (R$)</span>
            <strong>{payments.debito.toFixed(2)}</strong>
            <button type="button" onClick={() => handleAddPayment("debito", "débito")}>+
            </button>
          </div>
          <div className="payment-card">
            <span>Crédito (R$)</span>
            <strong>{payments.credito.toFixed(2)}</strong>
            <button type="button" onClick={() => handleAddPayment("credito", "crédito")}>+
            </button>
          </div>
        </div>

        {falta > 0 && (
          <div style={{ marginTop: 12, color: "#c0392b" }}>
            Falta R$ {falta.toFixed(2)} para fechar a venda.
          </div>
        )}
      </div>

      {showCpfModal && (
        <div className="cpf-modal-overlay">
          <div className="cpf-modal">
            <h3>Informe o CPF do cliente</h3>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
