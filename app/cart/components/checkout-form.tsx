"use client"

import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { checkout } from "../actions/checkout";

export interface checkOutFormProps {
    cartId: number
}

const initialState = {
    message: null
}

export function SubmitButton() {

    const { pending } = useFormStatus();

    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">Checkout</button>
    )
}

export function CheckoutForm({cartId}: checkOutFormProps) {
    const [state, formAction] = useFormState(checkout, initialState);

    return (
        <form action={formAction}>
            <input type="hidden" value={cartId} name="cartId" id="cartId" />

            <input type="text" name="Address" id="Address"></input>

            <SubmitButton />
        </form>
    )
}

