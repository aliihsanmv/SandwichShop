"use client"

import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { createMenuItem } from "../actions/menu-item-actions";

const initialState = {
    message: null
}

export function SubmitButton() {

    const { pending } = useFormStatus();

    return (
        <button type="submit" aria-disabled={pending}>
            Add
        </button>
    )
}

export function MenuItemForm() {
    const [state, formAction] = useFormState(createMenuItem, initialState);

    return (
        <form action={formAction}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
            <br />
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" required />
            <SubmitButton />
        </form>
    )
}

