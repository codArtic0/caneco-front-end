import "../styles/Button.css";


function Button({ onClick, children }) {
    return (
        <button onClick={onClick} className="botao-azul">
            {children}
        </button>
    );
}

export default Button;