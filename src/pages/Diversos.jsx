import "../styles/Dashboard.css";
import React from "react";
import {useNavigate} from 'react-router-dom';

function Diversos() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="bebidas-diversos-container">
                <div className="bebidas-diversos-header">
                    <h1>DIVERSOS</h1>
                </div>
                <div className="bebidas-content">
                    <p>diversos</p>
                    <h1>diversos</h1>
                </div>
            </div>
        </div>
    );
}

export default Diversos;