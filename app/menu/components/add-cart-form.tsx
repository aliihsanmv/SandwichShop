"use client"

import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { addToCart } from "../actions/add-to-cart-action";

export interface addToCartProps {
    itemId: number
}

const initialState = {
    message: null
}

export function SubmitButton() {

    const { pending } = useFormStatus();

    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">Add</button>
    )
}

export function AddCartForm({itemId}: addToCartProps) {
    const [state, formAction] = useFormState(addToCart, initialState);

    return (
        <form action={formAction}>
            <input type="hidden" value={itemId} name="itemId" id="itemId" />
            <SubmitButton />
        </form>
    )
}

