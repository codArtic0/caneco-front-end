import "../styles/Dashboard.css";
import React from "react";
import {useNavigate} from 'react-router-dom';

function Energeticos() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="bebidas-energeticos-container">
                <div className="bebidas-energeticos-header">
                    <h1>ENERGÉTICOS</h1>
                </div>
                <div className="bebidas-content">
                    <p>energéticos</p>
                    <h1>energéticos</h1>
                </div>
            </div>
        </div>
    );
}
export default Energeticos;