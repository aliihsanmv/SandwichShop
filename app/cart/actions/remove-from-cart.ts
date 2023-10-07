'use server'

import { cartRepo } from "@/app/helpers/cart-repository";
import { revalidatePath } from "next/cache"


export async function removeFromCart(prevState: any, formData: FormData) {
    const cartItemId = formData.get('cartItemId') as string;
    cartRepo.delete(Number(cartItemId));
    revalidatePath('/');
    return ({ message: "Removed menu item" });
}