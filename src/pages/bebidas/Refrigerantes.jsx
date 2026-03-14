import "../../styles/Dashboard.css";
import React, { useState, useEffect } from "react";
import api from "../../services/api.js";

export default function Refrigerantes() {

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [operator, setOperator] = useState("FULANO");
  const [dateTime, setDateTime] = useState("");
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    api.get("/admin/nome-operador")
      .then(response => {
        if (response.data) {
          setOperator(response.data.name);
        }
      })
      .catch(error => {
        console.error("Erro ao buscar nome do operador:", error);
      });
  }, []);

  useEffect(() => {
    api.get("/listar-produtos-por-nome/refrigerantes")
      .then(response => {
        if (response.data && response.data.produtos) {
          const mappedProducts = response.data.produtos.map(p => ({
            id: p.id_product,
            name: p.product_name,
            price: p.price
          }));
          setProducts(mappedProducts);
        }
        setLoadingProducts(false);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
        setLoadingProducts(false);
      });
  }, []);

  useEffect(() => {

    const interval = setInterval(() => {
      const now = new Date();
      setDateTime(now.toLocaleString());
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  useEffect(() => {
    if (product && quantity > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTotal(product.price * quantity);
    } else {
      setTotal(0);
    }
  }, [product, quantity]);

  const handleConfirm = () => {

    if (!product) {
      alert("Selecione um produto");
      return;
    }

    if (quantity <= 0) {
      alert("Informe uma quantidade válida");
      return;
    }

    const sale = {
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: quantity,
      total: total
    };

    console.log("Venda:", sale);
  };

  return (
    <div className="bebidas-refrigerantes-container">

      <div className="bebidas-refrigerantes-header">
        <h1>BEBIDAS REFRIGERANTES</h1>
        <div>OPERADOR: {operator}</div>
        <div>{dateTime}</div>
      </div>

      <div className="total-box">
        <span>TOTAL (R$)</span>
        <h1>{total.toFixed(2)}</h1>
      </div>

      <div className="form">

        <select
          value={product?.id || ""}
          onChange={(e) => {
            const selected = products.find(
              p => p.id === Number(e.target.value)
            );
            setProduct(selected);
          }}
        >
          <option value="" disabled>
            {loadingProducts ? "Carregando produtos..." : "Digite uma opção"}
          </option>

          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <button onClick={handleConfirm}>
          CONFIRMAR
        </button>

      </div>

    </div>
  );
}