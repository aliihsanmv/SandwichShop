'use server'

import { cartRepo } from "@/app/helpers/cart-repository";
import { cookies } from 'next/headers'
import { revalidatePath } from "next/cache"
import crypto from 'crypto'


export async function addToCart(prevState: any, formData: FormData) {
    const itemId = formData.get('itemId') as string;

    let id = cookies().get("sessionId")?.value;
    if(!id) 
    {
        id = crypto.randomBytes(16).toString("hex");
        cookies().set("sessionId", id);
    }

    cartRepo.addItem(1, Number(itemId), 1);
    revalidatePath('/');
    return ({ message: "Added menu item", isSuccess: true });
}
