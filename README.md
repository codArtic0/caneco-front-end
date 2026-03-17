# 🛒 Caneco - Front-end

O **Caneco - Caixa Automatizado para Negócios e Controle Operacional** é um sistema de frente de caixa (PDV) desenvolvido para otimizar o gerenciamento de vendas e estoque em supermercados. Este repositório contém a interface do usuário, construída com foco em performance, usabilidade e integração em tempo real com a API.

**[CONFIRA O BACKEND AQUI!](https://github.com/EricVenom/caneco-api-projeto-map)**

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

* **React.js**: Biblioteca principal para a construção da interface.
* **Vite**: Build tool de próxima geração para um desenvolvimento rápido.
* **React Router**: Gerenciamento de rotas e navegação.
* **Axios**: Cliente HTTP para consumo da API (FastAPI).
* **Lucide React**: Conjunto de ícones leves para a interface.

## 🚀 Funcionalidades (MVP)

* **Ponto de Venda (PDV)**: Interface rápida para registro de itens e fechamento de vendas.
* **Gestão de Estoque**: Visualização e controle de produtos integrados ao banco de dados.
* **Autenticação**: Sistema de login seguro via JWT para operadores e administradores.
* **Relatórios**: Visualização de resumo de vendas e movimentações.

## 📦 Como Executar o Projeto

### Pré-requisitos
Certifique-se de ter o **Node.js** instalado em sua máquina.

### Passo a passo

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/codArtic0/caneco-front-end.git
   cd caneco-front-end
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

4. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   Acesse: `http://localhost:5173`

## 📂 Estrutura de Pastas

```text
src/
├── assets/       # Imagens e recursos estáticos
├── components/   # Componentes reutilizáveis (Botões, Cards, Modais)
├── context/      # Gerenciamento de estado global
├── pages/        # Telas principais (Login, Dashboard, PDV)
├── services/     # Configuração do Axios e chamadas à API
├── routes/       # Definição das rotas da aplicação
├── styles/       # Estilização global e temas
└── App.jsx       # Componente raiz
```

## 🎓 Contexto Acadêmico

Este projeto está sendo desenvolvido como projeto da disciplina de **Laboratório de Engenharia de Software** no curso de **Ciência da Computação** da **Universidade Estadual da Paraíba (UEPB)**.

---
*Autores:*
* **[ADRIEL DA SILVA ARAUJO](https://github.com/adrieldsa88)**
* **[ERIC LUIZ LEANDRO SOARES](https://github.com/ericVenom)**
* **[GABRIEL CAIO DA SILVA VIEIRA](https://github.com/gabrielcaio11)**
* **[LUCAS DE MEDEIROS TRINDADE](https://github.com/lucastrdd)**
* **[PAULO CEZAR SILVA DE ARAUJO](https://github.com/paulo-araujo1)**
* **[RAUL HENRIQUE ALVES DE SOUSA](https://github.com/codArtic0)**

---

## ⚖️ Licença

Este projeto está licenciado sob a **Licença MIT** - consulte o arquivo [LICENSE](LICENSE) para mais detalhes.