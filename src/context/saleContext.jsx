import { createContext, useState } from "react";

export const SaleContext = createContext();

export function SaleProvider({ children }) {
    const [items, setItems] = useState([]);

    function addItem(product, quantity) {
        const newItem = {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity
        };

        setItems(prev => [...prev, newItem]);
    }

    const total = items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    return (
        <SaleContext.Provider value={{ items, addItem, total }}>
            {children}
        </SaleContext.Provider>
    );
}