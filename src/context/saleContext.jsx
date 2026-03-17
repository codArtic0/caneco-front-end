import { createContext, useState } from "react";

export const SaleContext = createContext();

export function SaleProvider({ children }) {
    const [items, setItems] = useState([]);
    const [cpf, setCpf] = useState("");
    const [discount, setDiscount] = useState(0);

    function addItem(product, quantity) {
        const newItem = {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity
        };

        setItems(prev => [...prev, newItem]);
    }

    const subtotal = items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const total = Number((subtotal * (1 - discount / 100)).toFixed(2));

    function clearSale() {
        setItems([]);
        setCpf("");
        setDiscount(0);
    }

    return (
        <SaleContext.Provider value={{ items, addItem, total, subtotal, clearSale, cpf, setCpf, discount, setDiscount }}>
            {children}
        </SaleContext.Provider>
    );
}