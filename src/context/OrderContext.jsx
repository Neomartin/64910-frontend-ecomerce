import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext)

export const OrderProvider = ({ children }) => {
    const [ order, setOrder] = useState([]);
    const [ menu, setMenu] = useState(false);

    const toggleMenu = () => {
        setMenu(!menu);        
    }

    const addProductToOrder = (product) => {
        setOrder([...order, product]);
        const total  = order.reduce((acc, product) => acc + product.price * product.quantity, 0);
    }

    const removeOrder = (id) => {
        setOrder(order.filter(product => product.id !== id));
    }

    return (
        <OrderContext.Provider value={{ order, addProductToOrder, removeOrder, toggleMenu }}>
            {children}
        </OrderContext.Provider>
    )
}