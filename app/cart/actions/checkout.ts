'use server'

import { cartRepo } from "@/app/helpers/cart-repository";
import { OrderAddressDto } from "@/app/helpers/order-repository";
import { revalidatePath } from "next/cache"


export async function checkout(prevState: any, formData: FormData) {
    const cartId = formData.get('cartId') as string;

    var address = {
        id: undefined,
        streetAddress: formData.get('streetAddress') as string,
        apartment: formData.get('apartment') as string,
        island: formData.get('apartment') as string
    }

    await cartRepo.checkout(Number(cartId), address);
    revalidatePath('/');
    return ({ message: "Checkout complete" });
}