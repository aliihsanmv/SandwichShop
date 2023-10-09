"use client"

import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { checkout } from "../actions/checkout";
import { useState } from 'react'

export interface checkOutFormProps {
    cartId: number
}

const initialState = {
    message: null,
}

export function SubmitButton() {

    const { pending } = useFormStatus();

    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">Checkout</button>
    )
}

export function CheckoutForm({cartId}: checkOutFormProps) {
    const [state, formAction] = useFormState(checkout, initialState);
    const [deliveryMode, setDeliveryMode] = useState(1);

    return (
        <form action={formAction}>
            <input type="hidden" value={cartId} name="cartId" id="cartId" />

            <label>pickup? </label>
            <input type="radio" name="deliveryMode" value={1} onClick={() => setDeliveryMode(1)}></input>
            < br/>
            <label>deliver</label>
            <input type="radio" name="deliveryMode" value={2} onClick={() => setDeliveryMode(2)} ></input>
            < br/>

            { deliveryMode == 2 &&
                <>
                <label>Address</label>
                <br />                
                <label>Street Address</label>
                <input type="text" name="streetAddress" id="streetAddress"></input>

                <br />                
                <label>Apartment, floor</label>
                <input type="text" name="apartment" id="apartment"></input>

                <br />                
                <label>Island</label>
                <input type="text" name="city" id="city"></input>

                < br/>
                </>
            }

            <SubmitButton />
        </form>
    )
}

