'use server'

import { revalidatePath } from "next/cache"
import { menuRepo } from "@/app/helpers/menu-repository"

export async function createMenuItem(prevState: any, formData: FormData) {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    const menuItem = {
        id: 0,
        name: name,
        description: description,
        price: 100,
        photoUrl: "https://insanelygoodrecipes.com/wp-content/uploads/2021/03/Grilled-Cheese-and-Tomato-Sandwich-683x1024.webp"
    }

    menuRepo.create(menuItem)
    revalidatePath('/');
    return ({ message: "Added menu item" });
}