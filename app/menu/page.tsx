

import MenuItem from "./components/menu-item";
import { CartContext } from "../contexts/cart";
import { MenuItemForm } from "./components/menu-item-form";
import { IMenuItem, menuRepo } from "../helpers/menu-repository";
import Pagination from "./components/pagination";
import { cartRepo } from "../helpers/cart-repository";

export default async function MenuPage({ searchParams }
    : { searchParams: { [key: string]: string | string[] | undefined }}) {

    const page = searchParams['page'] ?? '1';

    const paginatedList = await menuRepo.getByPage(Number(page));

    const cart = await cartRepo.getById(1);

    const cartCount = cart?.cartItems?.length ?? 0;

    const menuitems: IMenuItem[] = paginatedList.items.map<IMenuItem>(x => {
        return {
            ...x,
            price: Number.parseFloat(x.price.toString())
        }
    });


    return <main className="flex min-h-screen flex-col items-center justify-top p-24 bg-slate-300">
            <h1>Menu</h1>
            <p>cart item length {cartCount}</p>
            <p>{ menuitems.length }</p>
            <br />
            {/* <MenuItemForm /> */}
            <br />
            <section className="flex flex-row justify-center min-w-full flex-wrap gap-5">
                {
                    menuitems.map(m => (<MenuItem {...m}/>))
                }
            </section>
            <Pagination {...paginatedList} />
        </main>;
    
}