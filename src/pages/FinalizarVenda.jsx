import "../styles/FinalizarVenda.css";
import { showAlert, showSuccessAlert, showErrorAlert } from "../services/alerts";
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { SaleContext } from "../context/saleContext";

export default function FinalizarVenda() {
  const navigate = useNavigate();
  const { items, total, clearSale, cpf, subtotal } = useContext(SaleContext);

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const restante = Math.max(0, total - valorPago);

    if (method !== "dinheiro" && restante <= 0) {
      showAlert("A venda já está quitada.", "Para troco, use apenas dinheiro.");
      return;
    }

    const input = window.prompt(`Digite o valor em R$ para ${label}`);
    if (!input) return;
    const value = parseFloat(input.replace(/,/g, "."));

    if (Number.isNaN(value) || value <= 0) {
      showAlert("Valor inválido.", "Digite um valor válido maior que 0.");
      return;
    }

    if (method !== "dinheiro" && value > restante) {
      showAlert("Valor excedente.", `Esse método não permite excedente. Máximo: R$ ${restante.toFixed(2)}.`);
      return;
    }

    setPayments((prev) => ({
      ...prev,
      [method]: prev[method] + value,
    }));
  };

  const handleFinalizarVenda = () => {
    if (items.length === 0) {
      showAlert("Nenhum item adicionado.", "Adicione pelo menos um item antes de finalizar a venda.");
      return;
    }

    if (valorPago < total) {
      showErrorAlert("Valor insuficiente.", `Ainda faltam R$ ${falta.toFixed(2)} para completar a venda.`);
      return;
    }

    if (valorPago > total && payments.dinheiro < troco) {
      showAlert("Troco insuficiente.", "Para dar troco, o excedente precisa estar no pagamento em dinheiro.");
      return;
    }

    finalizarVenda(cpf);
  };

  const buildCheckoutItemsPayload = () => {
    return items.map((item) => ({
      id_product: item.productId,
      quantity: item.quantity,
    }));
  };

  const buildPagamentosPayload = () => {
    const pagamentos = [];

    if (payments.dinheiro > 0) pagamentos.push({ payment_method: "dinheiro", payment_amount: payments.dinheiro });
    if (payments.pix > 0) pagamentos.push({ payment_method: "pix", payment_amount: payments.pix });
    if (payments.debito > 0) pagamentos.push({ payment_method: "debito", payment_amount: payments.debito });
    if (payments.credito > 0) pagamentos.push({ payment_method: "credito", payment_amount: payments.credito });

    return pagamentos;
  };

  const finalizarVenda = async (cpfValueOrEmpty) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const formattedCpf = cpfValueOrEmpty ? formatCPF(cpfValueOrEmpty) : "";
      const cpfSomenteDigitos = formattedCpf.replace(/\D/g, "");

      const checkoutBody = {
        costumer_cpf: cpfSomenteDigitos || null,
        items: buildCheckoutItemsPayload(),
        total: total
      };
      const checkoutResp = await api.post("/checkout/realizar-checkout", checkoutBody);
      const checkoutCode = checkoutResp?.data?.checkout_code;

      if (!checkoutCode) {
        throw new Error("Checkout realizado, mas não retornou checkout_code.");
      }

      const pagamentos = buildPagamentosPayload();
      const pagamentoResp = await api.post(`/checkout/realizar-pagamento/${checkoutCode}`, { pagamentos });

      if (pagamentoResp.status !== 200) {
        throw new Error("Falha ao processar pagamento.");
      }

      clearSale();
      setPayments({ dinheiro: 0, pix: 0, debito: 0, credito: 0 });

      showSuccessAlert(
        formattedCpf
          ? `Venda finalizada com sucesso! CPF: ${formattedCpf}`
          : "Venda finalizada com sucesso!"
      );
      navigate("/dashboard");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Erro ao finalizar venda.";
      showErrorAlert("Erro ao finalizar venda.", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditarItens = () => {
    navigate("/dashboard/nova-venda");
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
          <div className="info">
              <strong>Subtotal: R$ {subtotal.toFixed(2)}</strong>
          </div>
          <div className="info">
            <strong>Desconto: R$ {((subtotal.toFixed(2)-total.toFixed(2)).toFixed(2))}</strong>
          </div>
          <div className="info">
            <strong>Total: R$ {total.toFixed(2)}</strong>
          </div>
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
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processando..." : "Finalizar Venda"}
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
    </div>
  );
}
