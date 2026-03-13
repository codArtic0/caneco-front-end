import "../styles/Dashboard.css";
import React from "react";
import {useNavigate} from 'react-router-dom';

function Alcoolicas() {
  return (
    <div>
        <div className="bebidas-alcoolicas-container">
            <div className="bebidas-alcoolicas-header">
                <h1>BEBIDAS ALCOÓLICAS</h1>
            </div>
            <div className="bebidas-alcoolicas-content">
                <p>Pagina das bebidas alcoólicas</p>
                <h1>bebida dreher</h1>                
            </div>
        </div>
    </div>
  );
}

export default Alcoolicas;