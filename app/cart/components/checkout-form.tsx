"use client"

import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { checkout } from "../actions/checkout";
import { useState } from 'react'
import { ZodError, ZodIssue } from "zod";

export interface checkOutFormProps {
    cartId: number
}

const initialState : { message: string | null, errorMessage: string | null, errors: ZodError[]} = {
    message: null,
    errorMessage: null,
    errors: []
}

export function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button className="btn btn-primary mt-5" aria-disabled={pending}>Checkout</button>
    )
}

export function CheckoutForm({cartId}: checkOutFormProps) {
    const [state, formAction] = useFormState(checkout, initialState);
    const [deliveryMode, setDeliveryMode] = useState(1);
    

    const addressStreetError = state?.errors?.find((x: ZodIssue) => x.path[0] == "streetAddress");
    const addressApartmentError = state?.errors?.find((x: ZodIssue) => x.path[0] == "apartment");
    const addressCityError = state?.errors?.find((x: ZodIssue) => x.path[0] == "city");
    const deliveryModeError = state?.errors?.find((x: ZodIssue) => x.path[0] == "deliveryMode");

    return (
        <form action={formAction} className="w-52">
            { state.errorMessage && 
                <div className="alert alert-error">
                    {state.errorMessage}
                </div>
            }

            { state.message &&
                <div className="alert alert-success">
                    {state.message}
                </div>
            }

            <input type="hidden" value={cartId} name="cartId" id="cartId" />

            {
                deliveryModeError &&
                <span className="label-text-alt text-red-600">Select one of the options</span>
            }
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Pickup?</span> 
                    <input type="radio" name="deliveryMode" value={1} onClick={() => setDeliveryMode(1)}
                    className={
                        deliveryModeError ?
                        "radio radio-error checked:bg-blue-500" :
                        "radio checked:bg-blue-500"} />
                </label>
                </div>
                <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Deliver</span> 
                    <input type="radio" name="deliveryMode" value={2} onClick={() => setDeliveryMode(2)} 
                    className={
                        deliveryModeError ?
                        "radio radio-error checked:bg-blue-500" :
                        "radio checked:bg-blue-500"} />
                       
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
                    <input type="text" name="streetAddress" id="streetAddress" 
                     className={
                        addressStreetError ?
                        "input input-bordered input-error w-full max-w-xs" :
                        "input input-bordered w-full max-w-xs"} />
                        {
                            addressStreetError &&
                            <span className="label-text-alt text-red-600">Please enter a street address</span>
                        }
                       
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">House/Apartment, floor</span>
                    </label>
                    <input type="text" name="apartment" id="apartment" 
                     className={
                        addressApartmentError ?
                        "input input-bordered input-error w-full max-w-xs" :
                        "input input-bordered w-full max-w-xs"} />
                        {
                            addressApartmentError &&
                            <span className="label-text-alt text-red-600">Please enter an apartment or house name</span>
                        }
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">City/Island</span>
                    </label>
                    <input type="text" name="city" id="city" 
                     className={
                        addressCityError ?
                        "input input-bordered input-error w-full max-w-xs" :
                        "input input-bordered w-full max-w-xs"} />
                        {
                            addressCityError &&
                            <span className="label-text-alt text-red-600">Please enter city or island name</span>
                        }
                </div>
    
                </>
            }

            <SubmitButton />
        </form>
    )
}

