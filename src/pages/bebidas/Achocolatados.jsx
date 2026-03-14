/* eslint-disable no-unused-vars */
import "../../styles/Dashboard.css";
import React from "react";
import {useNavigate} from 'react-router-dom';

function Achocolatados() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="bebidas-achocolatados-container">
                <div className="bebidas-achocolatados-header">
                    <h1>ACHOCOLATADOS</h1>
                </div>
                <div className="bebidas-content">
                    <p>achocolatados</p>
                    <h1>achocolatados</h1>
                </div>
            </div>
        </div>
    );
}
export default Achocolatados;