/* eslint-disable no-unused-vars */
import "../../styles/Dashboard.css";
import {useNavigate} from 'react-router-dom';

function Sucos() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="bebidas-sucos-container">
                <div className="bebidas-sucos-header">
                    <h1>SUCOS</h1>
                </div>
                <div className="bebidas-content">
                    <p>sucos</p>
                    <h1>sucos</h1>
                </div>
            </div>
        </div>
    );
}
export default Sucos;