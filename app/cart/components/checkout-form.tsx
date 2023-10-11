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
        <button className="btn btn-primary mt-5">Checkout</button>
    )
}

export function CheckoutForm({cartId}: checkOutFormProps) {
    const [state, formAction] = useFormState(checkout, initialState);
    const [deliveryMode, setDeliveryMode] = useState(1);

    return (
        <form action={formAction} className="w-52">
            <input type="hidden" value={cartId} name="cartId" id="cartId" />

            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Pickup?</span> 
                    <input type="radio" name="deliveryMode" value={1} onClick={() => setDeliveryMode(1)} className="radio checked:bg-blue-500"></input>
                </label>
                </div>
                <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Deliver</span> 
                    <input type="radio" name="deliveryMode" value={2} onClick={() => setDeliveryMode(2)} className="radio checked:bg-blue-500"></input>
                </label>
            </div>

            <label> </label>
            < br/>
            <label></label>
            
            < br/>

            { deliveryMode == 2 &&
                <>

                <label>Address</label>
                <br />        

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Street Address</span>
                    </label>
                    <input type="text" name="streetAddress" id="streetAddress" className="input input-bordered w-full max-w-xs"></input>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Apartment, floor</span>
                    </label>
                    <input type="text" name="apartment" id="apartment" className="input input-bordered w-full max-w-xs"></input>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">City/Island</span>
                    </label>
                    <input type="text" name="city" id="city" className="input input-bordered w-full max-w-xs"></input>
                </div>
    
                </>
            }

            <SubmitButton />
        </form>
    )
}

