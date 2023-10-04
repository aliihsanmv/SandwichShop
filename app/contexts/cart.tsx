"use client"
import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { ReactNode } from "react";

interface CartProps {
    children: ReactNode;
}

interface ICartContext {
    cart: number,
    setCart: Dispatch<SetStateAction<number>> | undefined
}

export const CartContext = createContext<ICartContext>({cart: 0, setCart: undefined});

export function CartProvider({ children } : CartProps) {
    const [cart, setCart] = useState(0);
    return (
        <CartContext.Provider
            value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}

