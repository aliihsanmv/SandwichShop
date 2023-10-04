

import MenuItem from "./components/menu-item";
import { CartContext } from "../contexts/cart";
import { MenuItemForm } from "./components/menu-item-form";
import { IMenuItem, menuRepo } from "../helpers/menu-repository";

export default async function MenuPage() {

    const menuitems: IMenuItem[] = (await menuRepo.getAll()).map<IMenuItem>(x => {
        return {
            ...x,
            price: Number.parseFloat(x.price.toString())
        }
    });


    return <main className="flex min-h-screen flex-col items-center justify-top p-24 bg-slate-300">
            <h1>Menu</h1>

            <p>{ menuitems.length }</p>
            <br />
            <MenuItemForm />
            <br />
            <section className="flex flex-row justify-center min-w-full flex-wrap gap-5">
                {
                    menuitems.map(m => (<MenuItem {...m}/>))
                }
            </section>
        </main>;
    
}