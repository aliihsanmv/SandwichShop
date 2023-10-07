"use client"

import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { removeFromCart } from "../actions/remove-from-cart";

export interface removeFromCartProps {
    cartItemId: number
}

const initialState = {
    message: null
}

export function SubmitButton() {

    const { pending } = useFormStatus();

    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">Remove</button>
    )
}

export function RemoveFromCartForm({cartItemId}: removeFromCartProps) {
    const [state, formAction] = useFormState(removeFromCart, initialState);

    return (
        <form action={formAction}>
            <input type="hidden" value={cartItemId} name="cartItemId" id="cartItemId" />
            <SubmitButton />
        </form>
    )
}

