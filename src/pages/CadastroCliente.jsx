import { useState } from "react";
import "../styles/Card.css";
import "../styles/Dashboard.css";
import api from "../services/api";

export default function CadastroCliente() {
  const [cpf, setCpf] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!cpf || !firstName || !lastName) {
      alert("Preencha CPF, primeiro nome e sobrenome.");
      return;
    }

    setIsSubmitting(true);
    try {
      const body = {
        cpf,
        first_name: firstName,
        last_name: lastName,
      };

      const resp = await api.post("/cadastrar-cliente", body);

      if (resp.status === 201) {
        alert("Cliente cadastrado com sucesso!");
        setCpf("");
        setFirstName("");
        setLastName("");
      } else {
        alert("Não foi possível cadastrar o cliente.");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.falha ||
        err?.response?.data?.error ||
        err?.message ||
        "Erro ao cadastrar cliente.";
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <div className="bebidas-refrigerantes-container">
        <div className="bebidas-refrigerantes-header">
          <h1>Cadastro de Cliente</h1>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="input-group">
            <label htmlFor="firstName">Primeiro nome</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="input-group">
            <label htmlFor="lastName">Sobrenome</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className="botao-verde"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Salvando..." : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

