import "../../styles/Dashboard.css";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../components/Dropdown";
import "../../styles/Card.css";
import "../../styles/Select.css";
import api from "../../services/api.js";
import { SaleContext } from "../../context/saleContext";
import Button from "../../components/Button.jsx";

export default function Alcoolicas() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [operator, setOperator] = useState("FULANO");
  const [dateTime, setDateTime] = useState("");
  const [loadingProducts, setLoadingProducts] = useState(true);
  const { addItem, total } = useContext(SaleContext);

  useEffect(() => {
    api.get("/admin/nome-operador")
      .then((response) => {
        if (response.data) setOperator(response.data.name);
      })
      .catch((error) => console.error("Erro ao buscar operador:", error));
  }, []);

  useEffect(() => {
    api.get("/listar-produtos-por-nome/alcoolicas")
      .then((response) => {
        if (response.data && response.data.produtos) {
          const mapped = response.data.produtos.map((p) => ({
            id: p.id_product,
            name: p.product_name,
            price: p.price,
          }));
          setProducts(mapped);
        }
        setLoadingProducts(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
        setLoadingProducts(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleConfirm = () => {
    if (!product) {
      alert("Selecione um produto");
      return;
    }
    if (quantity <= 0) {
      alert("Informe uma quantidade válida");
      return;
    }
    addItem(product, quantity);
    alert("Produto adicionado à venda!");
    setProduct(null);
    setQuantity(1);
  };

  return (
    <div className="card">
      <div className="bebidas-alcoolicas-container">
        <div className="bebidas-alcoolicas-header">
          <h1>BEBIDAS ALCOÓLICAS</h1>
          <div>OPERADOR: {operator}</div>
          <div>{dateTime}</div>
        </div>

        <div className="total-box">
          <span>TOTAL (R$)</span>
          <h1>{total.toFixed(2)}</h1>
        </div>

        <div className="form">
          <div style={{ width: "100%", color: "#000" }}>
            <Dropdown
              items={products}
              selectedItem={product}
              onChange={setProduct}
              isLoading={loadingProducts}
              placeholder="Digite o nome da bebida alcoólica..."
            />
          </div>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <Button onClick={handleConfirm}>
            CONFIRMAR
          </Button>

          <Button onClick={() => navigate("/dashboard/nova-venda")}>
            Adicionar mais itens
          </Button>
        </div>
      </div>
    </div>
  );
}