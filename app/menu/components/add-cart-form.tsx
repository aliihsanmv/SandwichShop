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
        <button className="btn btn-primary">Add</button>
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

