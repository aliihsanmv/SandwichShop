'use server'

import { cartRepo } from "@/app/helpers/cart-repository";
import { revalidatePath } from "next/cache"


export async function addToCart(prevState: any, formData: FormData) {
    const itemId = formData.get('itemId') as string;
    cartRepo.addItem(1, Number(itemId), 1);
    revalidatePath('/');
    return ({ message: "Added menu item" });
}