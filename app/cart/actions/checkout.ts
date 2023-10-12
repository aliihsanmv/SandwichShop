'use server'

import { cartRepo } from "@/app/helpers/cart-repository";
import { OrderAddressDto } from "@/app/helpers/order-repository";
import { revalidatePath } from "next/cache"
import { z } from "zod";


export async function checkout(prevState: any, formData: FormData) {

    const deliveryModeSchema = z.object({
        deliveryMode: z.number().max(2).min(1)
    });

    const addressSchema = z.object({
        streetAddress: z.string().min(1),
        apartment: z.string().min(1),
        city: z.string().min(1)
    });

    const cartId = formData.get('cartId') as string;
    const address = {
        id: undefined,
        streetAddress: formData.get('streetAddress') as string,
        apartment: formData.get('apartment') as string,
        city: formData.get('city') as string
    }

    const deliveryModeStr = formData.get('deliveryMode') as string;
    let deliveryMode = 0;
    if(deliveryModeStr) {
        deliveryMode = Number.parseInt(deliveryModeStr)
    }

    const deliveryModeRes = await deliveryModeSchema.safeParseAsync({
        deliveryMode
    });

    if(!deliveryModeRes.success) 
    {
        console.log(deliveryModeRes.error.issues);
        return ({ errorMessage: "Please select a delivery mode", errors: deliveryModeRes.error.issues })
    }

    if(deliveryMode == 2) 
    {
        const res = await addressSchema.safeParseAsync(address);
        if(!res.success) 
        {
            return ({ errorMessage: "Please correct the issues in the delivery address", errors: res.error.issues })
        }
    
    }

    var checkoutResult = await cartRepo.checkout(Number(cartId), deliveryMode, address);

    if(!checkoutResult.isSuccess) 
    {
        return ({ errorMessage: "An error occured trying to complete the checkout. Sorry for the inconvenience.", errors: [] })
    }

    revalidatePath('/');
    return ({ message: "Checkout complete" });
}