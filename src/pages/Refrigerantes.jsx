import "../styles/Dashboard.css";
import React from "react";
import {useNavigate} from 'react-router-dom';

function Refrigerantes() {
  return (
    <div>
      <div className="bebidas-refrigerantes-container">
        <div className="bebidas-refrigerantes-header">
          <h1>BEBIDAS REFRIGERANTES</h1>
        </div>
        <div className="bebidas-refrigerantes-content">
          <p>Pagina das bebidas refrigerantes</p>
          <h1>bebida coca-cola</h1>
        </div>
      </div>
    </div>
  );
}

export default Refrigerantes;