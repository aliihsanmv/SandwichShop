'use server'

import { cartRepo } from "@/app/helpers/cart-repository";
import { revalidatePath } from "next/cache"


export async function checkout(prevState: any, formData: FormData) {
    const cartId = formData.get('cartId') as string;
    await cartRepo.checkout(Number(cartId));
    revalidatePath('/');
    return ({ message: "Checkout complete" });
}