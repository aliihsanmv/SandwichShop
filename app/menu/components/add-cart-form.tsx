"use client"

import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { addToCart } from "../actions/add-to-cart-action";
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react'

export interface addToCartProps {
    itemId: number
}

const initialState = {
    message: null,
    isSuccess: false,
}

export function SubmitButton() {

    const { pending } = useFormStatus();

    return (
        <button className="btn btn-primary btn-sm">Add</button>
    )
}

export function AddCartForm({itemId}: addToCartProps) {
    const [state, formAction] = useFormState(addToCart, initialState);
    const [showAdded, setShowAdded] = useState(false);

    useEffect(() => {
        if(state?.isSuccess && !showAdded) 
        {
            setShowAdded(true);

            window.setTimeout(() => {
              setShowAdded(false);
            }, 600);
            
        }
    }, [state])

    

    return (
        <form action={formAction}>

            {
                showAdded && 
                <div className="relative">
                    <div className="absolute ml-4" style={{top: "-25px"}}>
                        <motion.div
                        initial={{ scale: 0, y: 20 }}
                        animate={{ rotate: 0, scale: 1, y: 0 }}
                        transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                        className="flex justify-center font-bold text-green-600"
                    >
                        +1
                    </motion.div>
                    </div>
                </div>
                
                
            }

            <input type="hidden" value={itemId} name="itemId" id="itemId" />
            <SubmitButton />
        </form>
    )
}

