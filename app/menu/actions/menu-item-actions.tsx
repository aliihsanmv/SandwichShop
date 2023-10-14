'use server'

import { revalidatePath } from "next/cache"
import { menuRepo } from "@/app/helpers/menu-repository"

export async function createMenuItem(prevState: any, formData: FormData) {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const ingredients = formData.get('ingredients') as string;
    const photoUrl = formData.get('photoUrl') as string;
    const priceStr = formData.get('price') as string;
    const ratingStr = formData.get('rating') as string;

    const menuItem = {
        id: 0,
        name: name,
        description: description,
        price: Number(priceStr),
        rating: Number(ratingStr),
        photoUrl: photoUrl,
        ingredients: ingredients.split(',')
    }

    menuRepo.create(menuItem)
    revalidatePath('/');
    return ({ message: "Added menu item" });
}